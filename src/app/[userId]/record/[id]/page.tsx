'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Cookies from "js-cookie";
import { fetchFormData } from "../../../../service/record";

export default function AnamnesisForm() {
  const { id } = useParams()
  const { userId } = useParams()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

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

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div> // Mostra a mensagem de carregamento
  }

  if (formData === null) {
    return <div className="text-center mt-10">Nenhum formulário encontrado ou erro ao carregar.</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{formData.name}</h1>
      <form>
        {formData.questions.map((question) => (
          <div key={question.id} className="mb-4">
            <label className="block mb-2 font-semibold">{question.question}</label>
            {/* Renderize o input apropriado com base em question.questionType */}
            <input type="text" className="w-full p-2 border rounded" required={question.isRequired} />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Enviar
        </button>
      </form>
    </div>
  )
}
