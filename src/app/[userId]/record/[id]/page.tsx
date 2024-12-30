'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Cookies from "js-cookie";
import { fetchFormData } from "../../../../service/record";
import DatePicker from "react-datepicker"; // Importa o DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Estilo do DatePicker

export default function AnamnesisForm() {
  const { id } = useParams()
  const { userId } = useParams()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [dateValues, setDateValues] = useState({}); // Estado para armazenar os valores das datas

  useEffect(() => {
    const getFormData = async () => {
      const authToken = Cookies.get("authToken");
      
      try {
        const data = await fetchFormData(userId, id, authToken);
        setFormData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do formulário:", error);
      } finally {
        setLoading(false); // Marcar como concluído o carregamento
      }
    };

    getFormData();
  }, [id, userId]); // Adicione userId como dependência do useEffect

  const handleDateChange = (date: Date, questionId: string) => {
    setDateValues((prevState) => ({
      ...prevState,
      [questionId]: date,
    }));
  };

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div> // Mostra a mensagem de carregamento
  }

  if (formData === null) {
    return <div className="text-center mt-10">Nenhum formulário encontrado ou erro ao carregar.</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{formData.name}</h1>
      <p className="text-sm font-normal mb-6">{formData.description}</p>
      <form>
        {formData.questions.map((question) => (
          <div key={question.id} className="mb-4">
            <label className="block mb-2 font-semibold">{question.question}</label>
            {/* Renderizar o input de acordo com o questionType */}
            {question.questionType === "TEXT" && (
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                required={question.isRequired} 
              />
            )}
            {question.questionType === "NUMBER" && (
              <input 
                type="number" 
                className="w-full p-2 border rounded" 
                required={question.isRequired} 
              />
            )}
            {question.questionType === "SELECT" && (
              <select 
                className="w-full p-2 border rounded" 
                required={question.isRequired}
              >
                {question.options[0].split(';').map((option, index) => (
                  <option key={index} value={option}>{option}</option>
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
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            )}
            {/* Campo de data */}
            {question.questionType === "DATE" && (
              <DatePicker
                selected={dateValues[question.id] || null} // Usando o valor armazenado no estado
                onChange={(date) => handleDateChange(date, question.id)} // Atualiza o estado com a data selecionada
                className="w-full p-2 border rounded" // Estilo com Tailwind
                required={question.isRequired} // Se o campo for obrigatório
                dateFormat="dd/MM/yyyy" // Formato da data
              />
            )}
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Enviar
        </button>
      </form>
    </div>
  )
}
