"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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
  image: "/placeholder.svg",
};

export default function ClientProfilePage({}: { params: { id: string } }) {
  const router = useRouter();
  const [client, setClient] = useState(mockClient);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClient((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // local que envia os dados atualizados do cliente para o seu backend
    console.log("Updated client data:", client);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Perfil do Cliente
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Visualize e edite as informações do cliente
          </p>
        </div>
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Informações do Cliente
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                />
                {isEditing && (
                  <Label
                    htmlFor="image-upload"
                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 cursor-pointer"
                  >
                    <Edit2 className="h-5 w-5" />
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </Label>
                )}
              </div>
              <h2 className="text-2xl font-bold">{client.name}</h2>
            </div>

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
                />
              </div>
              <div>
                <Label htmlFor="occupation">Ocupação</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={client.occupation}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={client.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
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

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Visitas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Última visita: {client.lastVisit}</p>
          {/* Here you could add a table or list of past visits */}
        </CardContent>
      </Card>
    </div>
  );
}
