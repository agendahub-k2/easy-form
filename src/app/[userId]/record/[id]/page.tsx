'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Cookies from "js-cookie";
import { fetchFormData } from "../../../../service/record";
import DatePicker from "react-datepicker"; // Importa o DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Estilo do DatePicker

export default function AnamnesisForm() {
  const { id: linkId, userId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({}); // Estado para armazenar as respostas
  const [dateValues, setDateValues] = useState({}); // Estado para armazenar as datas selecionadas

  useEffect(() => {
    const getFormData = async () => {
      const authToken = Cookies.get("authToken");

      try {
        const data = await fetchFormData(userId, linkId, authToken);
        setFormData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do formulário:", error);
      } finally {
        setLoading(false);
      }
    };

    getFormData();
  }, [linkId, userId]);

  // Atualiza as respostas do formulário
  const handleInputChange = (value, questionId) => {
    setResponses((prevState) => ({
      ...prevState,
      [questionId]: value,
    }));
  };

  // Atualiza as datas selecionadas
  const handleDateChange = (date, questionId) => {
    handleInputChange(date ? date.toISOString() : null, questionId);
    setDateValues((prevState) => ({
      ...prevState,
      [questionId]: date,
    }));
  };

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken");

    // Construindo o JSON de envio
    const payload = {
      perguntasComRespostas: formData.questions.map((question) => ({
        id: question.id,
        texto: question.question,
        tipo: question.questionType,
        resposta: responses[question.id] || null,
      })),
    };

    try {
      const response = await fetch(`http://localhost:8080/${userId}/record/submit-form/${linkId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Formulário enviado com sucesso!');
      } else {
        console.error('Erro ao enviar o formulário:', response.statusText);
        alert('Erro ao enviar o formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  if (formData === null) {
    return <div className="text-center mt-10">Nenhum formulário encontrado ou erro ao carregar.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{formData.name}</h1>
      <p className="text-sm font-normal mb-6">{formData.description}</p>
      <form onSubmit={handleSubmit}>
        {formData.questions.map((question) => (
          <div key={question.id} className="mb-4">
            <label className="block mb-2 font-semibold">{question.question}</label>
            {question.questionType === "TEXT" && (
              <input
                type="text"
                className="w-full p-2 border rounded"
                required={question.isRequired}
                onChange={(e) => handleInputChange(e.target.value, question.id)}
              />
            )}
            {question.questionType === "NUMBER" && (
              <input
                type="number"
                className="w-full p-2 border rounded"
                required={question.isRequired}
                onChange={(e) => handleInputChange(e.target.value, question.id)}
              />
            )}
            {question.questionType === "SELECT" && (
              <select
                className="w-full p-2 border rounded"
                required={question.isRequired}
                onChange={(e) => handleInputChange(e.target.value, question.id)}
              >
                {question.options[0].split(';').map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {question.questionType === "BOOLEAN" && (
              <div className="flex items-center space-x-4">
                {question.options[0].split(';').map((option, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      required={question.isRequired}
                      onChange={(e) => handleInputChange(option, question.id)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            )}
            {question.questionType === "DATE" && (
              <DatePicker
                selected={dateValues[question.id] || null}
                onChange={(date) => handleDateChange(date, question.id)}
                className="w-full p-2 border rounded"
                required={question.isRequired}
                dateFormat="dd/MM/yyyy"
              />
            )}
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Enviar
        </button>
      </form>
    </div>
  );
}
