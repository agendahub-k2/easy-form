"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Notification } from "@/components/Notificação";

// Mock client data
const mockClient = {
  id: 1,
  name: "João Silva",
  email: "joao@example.com",
  phone: "(11) 98765-4321",
  birthDate: "1985-05-15",
  cpf: "123.456.789-00",
  address: "Rua das Flores, 123 - São Paulo, SP",
  occupation: "Engenheiro de Software",
  lastVisit: "2024-01-15",
  cep: "00000000",
};

const occupations = [
  "Engenheiro de Software",
  "Médico",
  "Professor",
  "Arquiteto",
  "Designer",
  "Analista de Dados",
  "Contador",
  "Advogado",
  "Outros",
  "Analista de Sistemas",
  "Desenvolvedor Web",
  "Desenvolvedor Mobile",
  "Gerente de Projetos",
  "Administrador de Redes",
  "Especialista em Segurança da Informação",
  "Consultor de TI",
  "Marketing Digital",
  "Designer Gráfico",
  "Fotógrafo",
  "Jornalista",
  "Gestor de Recursos Humanos",
  "Analista de Marketing",
  "Coordenador de Vendas",
  "Gerente de Produto",
  "Gestor de Logística",
  "Arquiteto de Soluções",
  "Cientista de Dados",
  "Engenheiro Mecânico",
  "Engenheiro Civil",
  "Engenheiro Elétrico",
  "Engenheiro de Produção",
  "Farmacêutico",
  "Psicólogo",
  "Dentista",
  "Fisioterapeuta",
  "Nutricionista",
  "Esteticista",
  "Cabeleireiro",
  "Motorista",
  "Assistente Administrativo",
  "Assistente de Vendas",
  "Analista de Suporte",
  "Atendente",
  "Agente de Viagens",
  "Supervisor de Loja",
  "Coordenador de Marketing",
  "Engenheiro de Segurança do Trabalho",
  "Consultor de Vendas",
  "Product Owner",
  "Scrum Master",
  "Analista de Recursos Humanos",
  "Coach",
  "Professor de Ensino Superior",
  "Tradutor",
  "Copywriter",
  "Engenheiro de Software Sênior",
  "Analista de Qualidade de Software",
  "Programador Front-End",
  "Programador Back-End",
  "Designer de UX/UI",
  "Diretor de TI",
  "Gerente de TI",
  "Gerente de Infraestrutura",
  "Engenheiro de Automação",
  "Engenheiro de Redes",
  "Arquiteto de Dados",
  "Consultor de Negócios",
  "Consultor Financeiro",
  "Assistente Financeiro",
  "Designer de Produto",
  "Editor de Vídeo",
  "Analista de SEO",
  "Gerente de Marketing Digital",
  "Consultor de Marketing",
  "Analista de Comércio Exterior",
  "Técnico de Enfermagem",
  "Auxiliar de Enfermagem",
  "Recepcionista",
  "Auxiliar Administrativo",
  "Auxiliar de Logística",
  "Gerente Comercial",
  "Consultor de RH",
  "Gestor de Marketing",
  "Especialista em Logística",
  "Gestor de TI",
  "Consultor de Implantação",
  "Coordenador de Atendimento",
  "Técnico de Manutenção",
  "Analista de Infraestrutura",
  "Gerente de Vendas",
  "Gerente de Compras",
  "Coordenador de Projetos",
  "Assistente Jurídico",
  "Gerente de Operações",
  "Analista de Suprimentos",
  "Especialista em Pesquisa de Mercado",
  "Desenvolvedor de Jogos",
  "Gestor de Suprimentos",
  "Analista de Inteligência Comercial",
  "Gerente de Atendimento ao Cliente",
  "Consultor de Produtos",
  "Gerente de E-commerce",
  "Gerente de Marketing de Produto",
  "Consultor de Estratégia",
  "Gerente de Transformação Digital",
  "Técnico de Segurança do Trabalho",
  "Especialista em Automação de Marketing",
  "Designer de Moda",
  "Consultor de Comunicação",
  "Especialista em Análise de Dados",
  "Gestor de Inovação",
  "Técnico de Mecânica",
  "Analista de Banco de Dados",
  "Coordenador de Logística",
  "Gerente de Projetos de TI",
  "Analista de Sistemas Pleno",
  "Consultor de Treinamento",
  "Técnico de Informática",
  "Especialista em Banco de Dados",
  "Consultor de Desenvolvimento",
  "Diretor de Marketing",
  "Gestor de Comunicação",
  "Engenheiro de Automação Industrial",
  "Coordenador de Serviços",
  "Consultor de Sustentabilidade",
  "Gerente de Riscos",
  "Consultor de Planejamento Estratégico",
  "Analista de Auditoria",
  "Diretor Executivo",
  "Consultor de Vendas Externas",
  "Gerente de Contratos",
  "Assistente de Comunicação",
  "Analista de Processos",
  "Gestor de Responsabilidade Social",
  "Técnico de Rede",
  "Engenheiro de Testes de Software",
  "Especialista em Nuvem",
  "Coordenador de TI",
  "Gerente de Dados",
  "Consultor de Tecnologia",
  "Técnico de Suporte Técnico",
  "Consultor de Inovação Tecnológica",
];

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const formatDate = (value: string) => {
  return value;
};

const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

const fetchAddressByCEP = async (cep: string) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  if (data.erro) {
    throw new Error("CEP não encontrado");
  }
  return `${data.logradouro}, ${data.bairro} - ${data.localidade}, ${data.uf}`;
};

export default function ClientProfilePage({}: { params: { id: string } }) {
  const router = useRouter();
  const [client, setClient] = useState(mockClient);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "phone") {
      formattedValue = formatPhone(value);
    } else if (name === "cpf") {
      formattedValue = formatCPF(value);
    } else if (name === "birthDate") {
      formattedValue = formatDate(value);
    }

    setClient((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleOccupationChange = (value: string) => {
    setClient((prev) => ({ ...prev, occupation: value }));
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setClient((prev) => ({ ...prev, cep: value }));

    if (value.length === 8) {
      setIsLoading(true);
      try {
        const address = await fetchAddressByCEP(value);
        setClient((prev) => ({ ...prev, address }));
        setNotification({
          message: "O endereço foi preenchido automaticamente.",
          type: "success",
        });
      } catch (error) {
        setNotification({
          message: "Não foi possível encontrar o endereço para este CEP.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(client.email)) {
      setNotification({
        message: "Por favor, insira um email válido.",
        type: "error",
      });
      return;
    }
    // local para enviar dados atualizados para o seu backend
    console.log("Updated client data:", client);
    setIsEditing(false);
    setNotification({
      message: "As informações do cliente foram atualizadas.",
      type: "success",
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Perfil do Cliente
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Visualize e edite as informações do cliente
          </p>
        </div>
        <Button onClick={() => router.back()} variant="outline">
          Voltar
        </Button>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Informações do Cliente
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={client.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={client.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={client.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="(99) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={client.cpf}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="123.456.789-00"
                />
              </div>
              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={client.birthDate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="DD/MM/AAAA"
                />
              </div>
              <div>
                <Label htmlFor="occupation">Ocupação</Label>
                <Select
                  onValueChange={handleOccupationChange}
                  defaultValue={client.occupation}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma ocupação" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupations.map((occupation) => (
                      <SelectItem key={occupation} value={occupation}>
                        {occupation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  name="cep"
                  value={client.cep}
                  onChange={handleCEPChange}
                  disabled={!isEditing}
                  placeholder="00000-000"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={client.address}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Histórico de Fichas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Última Ficha: {client.lastVisit}</p>
        </CardContent>
      </Card>
    </div>
  );
}
