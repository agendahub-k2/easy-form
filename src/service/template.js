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

export const getCreatedForms = async (userId, token, page = 1, size = 10) => {
    try {
        return [];
      const data = await response.json();
      return data || []; // Retorna dados ou vazio caso a resposta seja `null` ou `undefined`
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
  