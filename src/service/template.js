const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const getTemplates = async (token) => {
    try {
        const response = await fetch(`${API_URL}/template`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Erro ao buscar templates");
        }
    
        return await response.json();
      } catch (error) {
        throw error;
      } 
}

export const getCreatedForms = async (userId, token, page, size) => {
  try {
      const url = `${API_URL}/${userId}/record?page=${page}&size=${size}`;
      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          throw new Error("Erro ao buscar fichas criadas");
      }

      return await response.json(); // Retorna os dados JSON da resposta
  } catch (error) {
      console.error("Erro ao buscar fichas criadas:", error);
      return []; // Retorna vazio em caso de erro
  }
};

  export const getTemplateById = async (id, token) => {
    try {
      const response = await fetch(`${API_URL}/template/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar template");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  }; 
  
  export const createRecord = async (token, userId, data) => {
    try {
      const response = await fetch(`${API_URL}/${userId}/record/create`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao criar registro");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };