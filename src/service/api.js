// services/api.js

const API_URL = "http://localhost:8080"; // URL da sua API

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
