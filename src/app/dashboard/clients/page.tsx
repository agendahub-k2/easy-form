"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, User, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const mockClients = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 98765-4321",
    lastVisit: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@example.com",
    phone: "(11) 91234-5678",
    lastVisit: "2024-01-10",
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro@example.com",
    phone: "(11) 99876-5432",
    lastVisit: "2024-01-05",
  },
  {
    id: 4,
    name: "Ana Rodrigues",
    email: "ana@example.com",
    phone: "(11) 94321-8765",
    lastVisit: "2024-01-01",
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    phone: "(11) 95678-1234",
    lastVisit: "2023-12-28",
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );

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
        {filteredClients.map((client, index) => (
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
                      {client.name}
                    </h3>
                    <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {client.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {client.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Última visita: {client.lastVisit}
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
    </div>
  );
}
