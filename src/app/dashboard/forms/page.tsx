"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, FileText, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getTemplates, getCreatedForms } from "../../../service/template";

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [templatesBySegment, setTemplatesBySegment] = useState({});
  const [createdForms, setCreatedForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        const [templatesResponse, forms] = await Promise.all([
          getTemplates(token), // Agora retorna no formato { templates: { segmentName: [...] } }
          getCreatedForms(userId, token),
        ]);

        setTemplatesBySegment(templatesResponse.templates || {});
        setCreatedForms(forms.content || []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterTemplatesBySegment = () => {
    const filtered = {};
    Object.entries(templatesBySegment).forEach(([segmentName, templates]) => {
      const filteredTemplates = templates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          segmentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredTemplates.length > 0) {
        filtered[segmentName] = filteredTemplates;
      }
    });
    return filtered;
  };

  const filteredTemplatesBySegment = filterTemplatesBySegment();

  const filteredForms = createdForms.filter((form) =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Sessão de Modelos de Fichas */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Modelos de Fichas</h1>
            <p className="text-gray-500">
              Escolha um modelo para começar sua ficha de anamnese
            </p>
          </div>
        </div>

        <div className="relative w-full max-w-sm mb-6">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar modelos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {Object.entries(filteredTemplatesBySegment).map(([segmentName, templates]) => (
          <div key={segmentName} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {segmentName}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template, index) => (
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
                        {template.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Segmento - {template.segment.description}<br/>
                        {template.description}
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
        ))}
      </section>

      {/* Sessão de Fichas Criadas */}
      {createdForms.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Fichas Criadas</h2>
              <p className="text-gray-500">Gerencie as fichas que você já criou</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FilePlus className="h-5 w-5 text-green-500" />
                      {form.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Criada em: {form.date}
                    </p>
                    <Button asChild className="w-full">
                      <Link href={`/dashboard/edit-form?id=${form.id}`}>
                        Editar Ficha
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
