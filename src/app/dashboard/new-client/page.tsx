"use client";

import { useState } from "react";
import { createPatient } from "../../../service/api"; // Ajuste o caminho para seu `api.js`
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function NewClientPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const authToken = Cookies.get("authToken");
    const userAuthenticated = JSON.parse(Cookies.get("userAuthenticated"));

    try {
      const result = await createPatient(userAuthenticated.id, { name, phone, email }, authToken);
      console.log("Paciente criado:", result);
      router.push("/dashboard/clients"); // Redireciona após sucesso
    } catch (err: any) {
      setError(err.message || "Erro ao criar paciente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Novo Cliente</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Telefone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          {isLoading ? "Criando..." : "Criar Cliente"}
        </button>
      </form>
    </div>
  );
}
