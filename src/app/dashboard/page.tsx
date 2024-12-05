"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Send, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const mockForms = [
  {
    id: 1,
    title: "Ficha de Anamnese - Padrão",
    type: "Clínica Geral",
    lastModified: "2024-01-15",
    responses: 12,
  },
  {
    id: 2,
    title: "Avaliação Inicial - Fisioterapia",
    type: "Fisioterapia",
    lastModified: "2024-01-14",
    responses: 8,
  },
  {
    id: 3,
    title: "Histórico Médico - Cardiologia",
    type: "Especialidade",
    lastModified: "2024-01-13",
    responses: 15,
  },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Gerencie suas fichas e formulários</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new-form">
            <Plus className="mr-2 h-4 w-4" />
            Nova Ficha
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Fichas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockForms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Respostas Recebidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockForms.reduce((acc, form) => acc + form.responses, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fichas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockForms.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Suas Fichas</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar fichas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockForms
              .filter(
                (form) =>
                  form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  form.type.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((form) => (
                <motion.div
                  key={form.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <div>
                    <h3 className="font-medium">{form.title}</h3>
                    <p className="text-sm text-gray-500">
                      {form.type} • Última modificação: {form.lastModified}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar
                    </Button>
                    <Button variant="default" size="sm">
                      Editar
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
