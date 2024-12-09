'use client'

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Search, FileText, User, Mail, Phone } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDebounce } from 'use-debounce'
import { searchPatientsByName } from '../../../service/api'
import Cookies from 'js-cookie'; 

interface Patient {
  id: string
  name: string
  email: string
  phone: string
}

interface SearchResponse {
  content: Patient[]
  totalPages: number
  totalElements: number
}

export default function NewRecord() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounce(searchTerm, 500)
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const router = useRouter();

  const searchPatients = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const authToken = Cookies.get("authToken");
      const userAuthenticated = JSON.parse(Cookies.get("userAuthenticated"));

      if (!authToken || !userAuthenticated.id) {
        throw new Error('Autenticação necessária')
      }

      const response = await searchPatientsByName(userAuthenticated.id, debouncedSearch, authToken, page, 10)
      
      if (page === 0) {
        setPatients(response.content)
      } else {
        setPatients(prev => [...prev, ...response.content])
      }
      
      setHasMore(page < response.totalPages - 1)
    } catch (err) {
      setError('Erro ao buscar clientes. Por favor, tente novamente.')
      console.error('Search error:', err)
      if (err.message === 'Autenticação necessária') {
        Cookies.remove('userAuthenticated');
        Cookies.remove('authToken'); 
        localStorage.removeItem('userAuthenticated');
        localStorage.removeItem('authToken');
        console.log("deslogando")
        router.push("/");
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(0)
    if (debouncedSearch) {
      searchPatients()
    } else {
      setPatients([])
      setHasMore(false)
    }
  }, [debouncedSearch])

  useEffect(() => {
    if (page > 0 && hasMore) {
      searchPatients()
    }
  }, [page])

  useEffect(() => {
    if (!searchTerm) {
      setPatients([]);
      setHasMore(false);
    }
  }, [searchTerm]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nova Ficha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {error && (
            <div className="text-red-500 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="hover:border-indigo-500 transition-colors">
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
                      setSelectedPatient(patient);
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

            {loading && (
              <div className="text-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
              </div>
            )}

            {hasMore && !loading && patients.length > 0 && (
              <Button
                onClick={loadMore}
                variant="outline"
                className="w-full"
              >
                Carregar mais
              </Button>
            )}

            {!loading && patients.length === 0 && searchTerm && (
              <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                Nenhum paciente encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-indigo-500" />
                <p className="font-medium">{selectedPatient.name}</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-indigo-500" />
                <p>{selectedPatient.email}</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-indigo-500" />
                <p>{selectedPatient.phone}</p>
              </div>
            </div>
            <Button className="mt-4 w-full" onClick={() => console.log('Proceed with selected patient:', selectedPatient)}>
              Enviar ficha para o cliente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

