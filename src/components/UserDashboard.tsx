'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import { CustomAnamnesis } from './CustomAnamnesis'

const mockForms = [
  { id: 1, name: 'João Silva', type: 'Médico', date: '2023-05-10', data: { /* form data */ } },
  { id: 2, name: 'Maria Oliveira', type: 'Nutrição', date: '2023-05-15', data: { /* form data */ } },
  { id: 3, name: 'Pedro Santos', type: 'Fisioterapia', date: '2023-05-20', data: { /* form data */ } },
  { id: 4, name: 'Ana Rodrigues', type: 'Veterinário', date: '2023-05-25', data: { petName: 'Rex', petSpecies: 'Cão' } },
  { id: 5, name: 'Carlos Mendes', type: 'Pediatria', date: '2023-05-30', data: { /* form data */ } },
  { id: 6, name: 'Lúcia Ferreira', type: 'Dermatologia', date: '2023-06-05', data: { /* form data */ } },
  { id: 7, name: 'José Almeida', type: 'Odontológico', date: '2023-06-10', data: { /* form data */ } },
  { id: 8, name: 'Sofia Pereira', type: 'Psicologia', date: '2023-06-15', data: { /* form data */ } },
  { id: 9, name: 'Rui Costa', type: 'Oftalmologia', date: '2023-06-20', data: { /* form data */ } },
  { id: 10, name: 'Inês Santos', type: 'Ortopedia', date: '2023-06-25', data: { /* form data */ } },
];

const getServiceTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'Médico': 'bg-blue-100 text-blue-800',
    'Nutrição': 'bg-green-100 text-green-800',
    'Fisioterapia': 'bg-yellow-100 text-yellow-800',
    'Veterinário': 'bg-purple-100 text-purple-800',
    'Pediatria': 'bg-pink-100 text-pink-800',
    'Dermatologia': 'bg-red-100 text-red-800',
    'Odontológico': 'bg-indigo-100 text-indigo-800',
    'Psicologia': 'bg-teal-100 text-teal-800',
    'Oftalmologia': 'bg-orange-100 text-orange-800',
    'Ortopedia': 'bg-cyan-100 text-cyan-800',
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

export function UserDashboard() {
  const [showAnamnesis, setShowAnamnesis] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredForms, setFilteredForms] = useState(mockForms)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = mockForms.filter(form => 
      form.name.toLowerCase().includes(term) ||
      form.type.toLowerCase().includes(term)
    )
    setFilteredForms(filtered)
  }

  const handleDownloadPDF = (formId: number) => {
    console.log(`Downloading PDF for form ${formId}`)
  }

  const handleSendAsJPG = (formId: number) => {
    console.log(`Sending JPG for form ${formId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Painel do Usuário</h1>
        
        <Tabs defaultValue="forms" className="space-y-8">
          <TabsList className="bg-blue-100">
            <TabsTrigger value="forms">Minhas Fichas</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="actions">Ações Rápidas</TabsTrigger>
          </TabsList>

          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Fichas Criadas</CardTitle>
                <CardDescription>Visualize e gerencie suas fichas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="search">Pesquisar Fichas</Label>
                  <Input
                    id="search"
                    placeholder="Digite o nome do paciente ou tipo de ficha"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <AnimatePresence>
                  {filteredForms.map((form) => (
                    <motion.div
                      key={form.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white shadow rounded-lg p-4 mb-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{form.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${getServiceTypeColor(form.type)}`}>
                              {form.type}
                            </span>
                            <p className="text-sm text-gray-500">{form.date}</p>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadPDF(form.id)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            PDF
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendAsJPG(form.id)}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            JPG
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>Resumo da sua atividade</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                    <h3 className="text-2xl font-bold">{filteredForms.length}</h3>
                    <p>Total de Fichas</p>
                  </div>
                  <div className="bg-blue-400 text-white rounded-lg p-4 text-center">
                    <h3 className="text-2xl font-bold">
                      {filteredForms.filter(form => new Date(form.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                    </h3>
                    <p>Fichas este mês</p>
                  </div>
                  <div className="bg-blue-300 text-white rounded-lg p-4 text-center">
                    <h3 className="text-2xl font-bold">
                      {new Set(filteredForms.map(form => form.type)).size}
                    </h3>
                    <p>Tipos de serviço</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesso rápido às funcionalidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={() => setShowAnamnesis(true)} className="h-auto py-8">
                    <Download className="mr-2 h-6 w-6" />
                    Nova Ficha de Anamnese
                  </Button>
                  <Button variant="outline" asChild className="h-auto py-8">
                    <Link href="#">
                      Gerenciar Clientes
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto py-8">
                    <Link href="#">
                      Configurações da Conta
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto py-8">
                    <Link href="#">
                      Suporte
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <AnimatePresence>
        {showAnamnesis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 flex justify-between items-center bg-blue-600 text-white">
                <h2 className="text-2xl font-bold">Nova Ficha de Anamnese</h2>
                <Button variant="ghost" onClick={() => setShowAnamnesis(false)}>
                  Fechar
                </Button>
              </div>
              <CustomAnamnesis />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

