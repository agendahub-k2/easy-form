"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const formTemplates = [
  { id: 1, title: "Anamnese Geral", category: "Clínica Geral" },
  { id: 2, title: "Avaliação Fisioterapêutica", category: "Fisioterapia" },
  { id: 3, title: "Histórico Médico", category: "Medicina" },
  { id: 4, title: "Avaliação Nutricional", category: "Nutrição" },
  { id: 5, title: "Anamnese Odontológica", category: "Odontologia" },
  { id: 6, title: "Avaliação Psicológica", category: "Psicologia" },
  { id: 7, title: "Anamnese Pediátrica", category: "Pediatria" },
  { id: 8, title: "Avaliação Dermatológica", category: "Dermatologia" },
  { id: 9, title: "Histórico Cardiovascular", category: "Cardiologia" },
];

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = formTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Modelos de Fichas
          </h1>
          <p className="text-gray-500">
            Escolha um modelo para começar sua ficha de anamnese
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Buscar modelos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  {template.category}
                </p>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/new-form?template=${template.id}`}>
                    Usar este modelo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
