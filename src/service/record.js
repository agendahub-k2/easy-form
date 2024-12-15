const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Função que busca os dados do formulário pelo id
 * @param {string} id - O ID do formulário a ser buscado.
 * @returns {Promise<object|null>} - Retorna os dados do formulário ou null se não encontrar.
 */
export const fetchFormData = async (userId, id, authToken) => {

  console.log(`${API_URL}/${userId}/record/form-data/${id}`)
  try {
    const response = await fetch(`${API_URL}/${userId}/record/form-data/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });;


    if (!response.ok) {
      throw new Error('Erro ao buscar dados do formulário');
    }

    const data = await response.json();

    // Se não houver dados ou se o formato estiver incorreto, retorna null
    if (!data || !data.questions || data.questions.length === 0) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do formulário:', error);
    return null; // Retorna null em caso de erro
  }
};