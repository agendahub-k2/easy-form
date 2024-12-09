"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, User, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { searchPatientsByName, getPatientsByUserId } from "../../../service/api";
import Cookies from "js-cookie";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <span className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        Página {currentPage} de {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Próxima
      </Button>
    </div>
  );
};

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Página inicial corrigida
  const [pageSize] = useState(2); // Número de itens por página
  const [totalClients, setTotalClients] = useState(0); // Total de clientes

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const authToken = Cookies.get("authToken");
      const userAuthenticated = JSON.parse(Cookies.get("userAuthenticated"));

      const pageToRequest = currentPage - 1; // Ajusta para 0-indexed se necessário pela API

      const response = searchTerm.length >= 3
        ? await searchPatientsByName(userAuthenticated.id, searchTerm, authToken, pageToRequest, pageSize)
        : await getPatientsByUserId(userAuthenticated.id, authToken, pageToRequest, pageSize);

      if (response && response.content) {
        setClients(response.content);
        setTotalClients(response.totalElements || 0);
      } else {
        setClients([]);
        setTotalClients(0);
      }
    } catch (error: any) {
      setError(error.message || "Erro ao buscar dados");
    } finally {
      setIsLoading(false);
    }
  };

  // Chama fetchClients quando a página mudar ou o termo de busca mudar
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchClients();
    }, 900); // Deixa o tempo de espera para o campo de busca antes de chamar a API
    return () => clearTimeout(timeout);
  }, [searchTerm, currentPage]); // Executa quando qualquer uma dessas dependências mudar

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Clientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gerencie seus clientes cadastrados
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new-client">Novo Cliente</Link>
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-4">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-2">
                    <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {client.name || "Nome não informado"}
                    </h3>
                    <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {client.email || "Email não informado"}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {client.phone || "Telefone não informado"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Última visita: {client.lastVisit || "Não disponível"}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/clients/${client.id}`}>
                      Ver detalhes
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Pagination
        pageCount={Math.ceil(totalClients / pageSize)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
