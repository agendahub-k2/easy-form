"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getTemplateById, createRecord } from "../../../service/template";
import { useRouter } from "next/navigation";

export default function NewFormPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [formTitle, setFormTitle] = useState("");
  const [description, setDescription] = useState("");
  const [segmento, setSegmento] = useState("");
  const [descricaoSegmento, setDescricaoSegmento] = useState("");
  const [fields, setFields] = useState<Array<{
    id: number;
    questionType: string;
    question: string;
    section: number;
    descriptionSection: string;
    isRequired: boolean;
    options?: string[];
  }>>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!templateId) return;

    const fetchTemplate = async () => {
      try {
        const authToken = Cookies.get("authToken");
        const response = await getTemplateById(templateId, authToken);
        if (response) {
          setFormTitle(response.name || "");
          setDescription(response.description || "");
          setSegmento(response.segment.name || "");
          setDescricaoSegmento(response.segment.description || "");
          setFields(response.questions || []);
        }
      } catch (error) {
        console.error("Erro ao carregar o template:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação das opções para campos de seleção
    const invalidFields = fields.filter(field => 
      field.questionType === "SELECT" && (!field.options || field.options.length < 2)
    );

    console.log(invalidFields)

    if (invalidFields.length > 0) {
      alert("Por favor, adicione opções para todos os campos de seleção.");
      return;
    }

    const token = Cookies.get("authToken");
    const userAuthenticated = JSON.parse(Cookies.get("userAuthenticated"));
  
    // Transformando os dados no formato necessário
    const data = {
      name: formTitle,
      templateId, // Certifique-se que templateId está vindo corretamente de useSearchParams
      segment: {
        name: segmento,
        description: descricaoSegmento,
      },
      description,
      questions: fields.map((field) => ({
        id: field.id,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        question: field.question,
        section: field.section,
        descriptionSection: field.descriptionSection,
        isRequired: field.isRequired,
        questionType: field.questionType,
        options: field.options
      })),
    };
  
    try {
      console.log(data);
      const response = await createRecord(token, userAuthenticated.id, data);
      alert("Ficha cadastrada!");
      router.push("/dashboard/forms");
    } catch (error) {
      console.error("Erro ao criar registro:", error);
      alert("Erro ao criar ficha!");
    }
  };
  

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nova Ficha</h1>
          <p className="text-gray-500">Crie uma nova ficha baseada no template ou totalmente personalizada</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Título da Ficha</Label>
                  <Input
                    id="title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ex: Ficha de Anamnese - Clínica Geral"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Segmento</Label>
                    <Input
                      id="type"
                      value={segmento}
                      onChange={(e) => setSegmento(e.target.value)}
                      placeholder="Ex: Clínica Geral, Fisioterapia, etc."
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="segmentDescription">Descrição do Segmento</Label>
                    <Input
                      id="segmentDescription"
                      value={descricaoSegmento}
                      onChange={(e) => setDescricaoSegmento(e.target.value)}
                      placeholder="Descrição do segmento"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="description">Detalhes da Ficha</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descrição da ficha"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campos do Formulário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Object.entries(
                fields.reduce((acc, field) => {
                  if (!acc[field.section]) {
                    acc[field.section] = [];
                  }
                  acc[field.section].push(field);
                  return acc;
                }, {})
              ).map(([section, sectionFields]) => (
                <div key={section} className="space-y-4">
                  <h3 className="text-lg font-semibold">{sectionFields[0].descriptionSection}</h3>
                  {sectionFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <Input
                          value={field.question}
                          onChange={(e) => {
                            const newFields = [...fields];
                            const fieldIndex = newFields.findIndex(f => f.id === field.id);
                            newFields[fieldIndex].question = e.target.value;
                            setFields(newFields);
                          }}
                        />
                      </div>
                      <select
                        value={field.questionType}
                        onChange={(e) => {
                          const newFields = [...fields];
                          const fieldIndex = newFields.findIndex(f => f.id === field.id);
                          newFields[fieldIndex].questionType = e.target.value;
                          setFields(newFields);
                        }}
                        className="border rounded-md p-2"
                      >
                        <option value="TEXT">Texto</option>
                        <option value="SELECT">Seleção</option>
                        <option value="NUMBER">Número</option>
                        <option value="BOOLEAN">Sim/Não</option>
                        <option value="DATE">Data</option>
                      </select>
                      {field.questionType === "SELECT" && (
                        <div className="flex-1 ml-4">
                          <Input
                            placeholder="Opções (separadas por ponto e vírgula)"
                            value={field.options?.join("; ") || ""}
                            onChange={(e) => {
                              const newFields = [...fields];
                              const fieldIndex = newFields.findIndex(f => f.id === field.id);
                              newFields[fieldIndex].options = e.target.value.split(",").map(opt => opt.trim());
                              setFields(newFields);
                            }}
                            className={field.options?.length === 0 ? "border-red-500" : ""}
                            required
                          />
                          {field.options?.length === 0 && (
                            <p className="text-red-500 text-sm mt-1">Opções são obrigatórias para campos de seleção</p>
                          )}
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`required-${field.id}`}
                          checked={field.isRequired}
                          onCheckedChange={(checked) => {
                            const newFields = [...fields];
                            const fieldIndex = newFields.findIndex(f => f.id === field.id);
                            newFields[fieldIndex].isRequired = checked;
                            setFields(newFields);
                          }}
                        />
                        <label
                          htmlFor={`required-${field.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Obrigatório
                        </label>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newFields = fields.filter(f => f.id !== field.id);
                          setFields(newFields);
                        }}
                      >
                        Remover
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                const lastField = fields[fields.length - 1];
                setFields([
                  ...fields,
                  {
                    id: fields.length + 1,
                    questionType: "TEXT",
                    question: "Nova Pergunta",
                    section: lastField ? lastField.section : 1,
                    descriptionSection: lastField ? lastField.descriptionSection : "Nova Seção",
                    isRequired: false,
                    options: [],
                  },
                ]);
              }}
            >
              Adicionar Campo
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancelar</Link>
          </Button>
          <Button onClick={handleSubmit}>Salvar Ficha</Button>
        </div>
      </div>
    </div>
  );
}

