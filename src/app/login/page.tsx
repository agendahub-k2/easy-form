"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackgroundWrapper } from "../../components/BackgroundWrapper";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { loginUser } from "../../service/api";

import Cookies from "js-cookie";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Chama o serviço de login
      const response = await loginUser({ email, password });
    
      // Supondo que o token vem como "response.token"
      if (response.token) {    
        Cookies.set("userAuthenticated", JSON.stringify(response), { expires: 7 }); // Cookie por 7 dias
        Cookies.set("authToken", response.token, { expires: 7 });
        router.push("/dashboard");
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    }
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na sua conta
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <Link
              href="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Link>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </BackgroundWrapper>
  );
}
