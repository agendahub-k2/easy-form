"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NewFormPage() {
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("");
  const [fields, setFields] = useState([
    { id: 1, type: "text", label: "Nome", required: true },
    { id: 2, type: "text", label: "Ocupação", required: true },
    { id: 3, type: "text", label: "Endereço", required: true },
    { id: 4, type: "text", label: "RG", required: true },
    { id: 5, type: "text", label: "CPF", required: true },
    { id: 6, type: "text", label: "Data Nasc.", required: true },
    { id: 7, type: "checkbox", label: "É fumante?", required: false },
    { id: 8, type: "checkbox", label: "Possui diabetes?", required: false },
    {
      id: 9,
      type: "checkbox",
      label: "Faz exercício físico regular?",
      required: false,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formTitle, formType, fields });
  };

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
          <p className="text-gray-500">Crie uma nova ficha de anamnese</p>
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
                <div>
                  <Label htmlFor="type">Tipo de Serviço</Label>
                  <Input
                    id="type"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="Ex: Clínica Geral, Fisioterapia, etc."
                  />
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
            <div className="space-y-4">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <Input
                      value={field.label}
                      onChange={(e) => {
                        const newFields = [...fields];
                        newFields[index].label = e.target.value;
                        setFields(newFields);
                      }}
                    />
                  </div>
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].type = e.target.value as
                        | "text"
                        | "checkbox";
                      setFields(newFields);
                    }}
                    className="border rounded-md p-2"
                  >
                    <option value="text">Texto</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newFields = fields.filter((_, i) => i !== index);
                      setFields(newFields);
                    }}
                  >
                    Remover
                  </Button>
                </motion.div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFields([
                    ...fields,
                    {
                      id: fields.length + 1,
                      type: "text",
                      label: "Novo Campo",
                      required: false,
                    },
                  ]);
                }}
              >
                Adicionar Campo
              </Button>
            </div>
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
