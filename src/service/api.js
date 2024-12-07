// services/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPatientsByUserId = async (userId, token, page, size) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/patientId?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar informações dos pacientes");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const searchPatientsByName = async (userId, searchTerm, authToken, page, size) => {
  const response = await fetch(`${API_URL}/${userId}/patientId/find?name=${searchTerm}&page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await response.json();
};

export const createPatient = async (userId, patientData, token) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/patientId/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar paciente");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};