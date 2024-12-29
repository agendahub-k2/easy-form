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

/**
 * Função que envia o registro para o paciente.
 * @param {number} recordId - O ID do registro.
 * @param {string} message - A mensagem que será enviada.
 * @param {boolean} isSendWhatsapp - Se o envio será feito pelo WhatsApp.
 * @param {boolean} isSendMail - Se o envio será feito por e-mail.
 * @param {string} clientId - O ID do paciente.
 * @param {string} authToken - Token de autenticação.
 * @returns {Promise<object|null>} - Retorna a resposta da API ou null se houver erro.
 */
export const sendRecord = async (recordId, message, isSendWhatsapp, isSendMail, clientId, authToken) => {
  try {
    const response = await fetch(`${API_URL}/1/record/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recordId,
        message,
        isSendWhatsapp,
        isSendMail,
        clientId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao enviar ficha');
    }

    return data; // Retorna a resposta caso a requisição seja bem-sucedida
  } catch (error) {
    console.error('Erro ao enviar ficha:', error);
    return null; // Retorna null em caso de erro
  }
};