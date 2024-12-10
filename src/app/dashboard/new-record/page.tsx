'use client'

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { Search, FileText, User, Mail, Phone, Calendar } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Switch from 'react-switch'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDebounce } from 'use-debounce'
import { searchPatientsByName } from '../../../service/api'
import { getCreatedForms, getTemplateByName } from '../../../service/template'
import Cookies from 'js-cookie'
import { Patient, Form, SearchResponse, SelectedItems } from '../types'

export default function NewRecord() {
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [checked, setChecked] = useState(false)
  const [debouncedSearch] = useDebounce(searchTerm, 500)
  const [patients, setPatients] = useState<Patient[]>([])
  const [forms, setForms] = useState<Form[]>([])
  const [selected, setSelected] = useState<SelectedItems>({
    patient: null,
    form: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('patients')
  const router = useRouter()

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked)
  }

  const searchPatients = async () => {
    try {
      setLoading(true)
      setError(null)

      const authToken = Cookies.get("authToken")
      const userAuthenticated = JSON.parse(Cookies.get("userAuthenticated"))

      if (!authToken || !userAuthenticated.id) {
        throw new Error('Autenticação necessária')
      }

      const response = await searchPatientsByName(userAuthenticated.id, debouncedSearch, authToken, 0, 4)
      setPatients(response.content)
    } catch (err) {
      setError('Erro ao buscar clientes. Por favor, tente novamente.')
      console.error('Search error:', err)
      if (err.message === 'Autenticação necessária') {
        handleAuthError()
      }
    } finally {
      setLoading(false)
    }
  }

  const searchForms = async () => {
    try {
      setLoading(true)
      setError(null)

      const authToken = Cookies.get("authToken")
      const userAuthenticated = JSON.parse(Cookies.get("userAuthenticated"))

      if (!authToken || !userAuthenticated.id) {
        throw new Error('Autenticação necessária')
      }

      let response
      if (debouncedSearch) {
        const templateResponse = await getTemplateByName(userAuthenticated.id, debouncedSearch, authToken)
        // Adaptar o retorno para o mesmo formato de getCreatedForms
        response = {
          content: Array.isArray(templateResponse) ? templateResponse : [templateResponse],
          totalPages: 1,
          totalElements: Array.isArray(templateResponse) ? templateResponse.length : 1
        }
      } else {
        response = await getCreatedForms(userAuthenticated.id, authToken, 0, 4)
      }

      setForms(response.content.slice(0, 4))
    } catch (err) {
      setError('Erro ao buscar fichas. Por favor, tente novamente.')
      console.error('Search error:', err)
      if (err.message === 'Autenticação necessária') {
        handleAuthError()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAuthError = () => {
    Cookies.remove('userAuthenticated')
    Cookies.remove('authToken')
    localStorage.removeItem('userAuthenticated')
    localStorage.removeItem('authToken')
    router.push("/")
  }

  useEffect(() => {
    if (activeTab === 'patients' && debouncedSearch) {
      searchPatients()
    } else if (activeTab === 'forms') {
      searchForms()
    }
  }, [debouncedSearch, activeTab])

  useEffect(() => {
    if (!searchTerm) {
      setPatients([]);
      setForms([]);
    }
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="patients" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patients">Buscar Cliente</TabsTrigger>
              <TabsTrigger value="forms">Buscar ficha</TabsTrigger>
            </TabsList>
            <TabsContent value="patients">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {patients.map((patient) => (
                  <Card key={patient.id} className="hover:border-primary transition-colors">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="font-medium">{patient.name}</p>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">{patient.email}</p>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">{patient.phone}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setSelected(prev => ({ ...prev, patient }));
                          setSearchTerm('');
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Selecionar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="forms">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Buscar ficha..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {forms.map((form) => (
                  <Card key={form.id} className="hover:border-primary transition-colors">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="font-medium">{form.name}</p>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {form.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setSelected(prev => ({ ...prev, form }));
                          setSearchTerm('');
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Selecionar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="text-red-500 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          )}
        </CardContent>
      </Card>

      {(selected.patient || selected.form) && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do envio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selected.patient && (
              <div className="space-y-2">
                <h3 className="font-semibold">Destinatário</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    <p className="font-medium">{selected.patient.name}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    <p>{selected.patient.email}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    <p>{selected.patient.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {selected.form && (
              <div className="space-y-2">
                <h3 className="font-semibold">Ficha</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    <p className="font-medium">{selected.form.name}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <label className="font-semibold">Data Retorno</label>
              <Switch checked={checked} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="message" className="font-semibold">
                Mensagem
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem aqui"
                className="mt-2"
                rows={2}
              />
            </div>

            <Button
              className="w-full"
              disabled={!selected.patient || !selected.form}
              onClick={() => console.log('Enviar ficha:', selected)}
            >
              Enviar ficha para o cliente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

