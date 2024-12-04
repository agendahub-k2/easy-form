'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogoUpload } from './LogoUpload'
import { BackgroundCustomizer } from './BackgroundCustomizer'
import Image from 'next/image'

const serviceTypes = [
  { value: 'medical', label: 'Médico' },
  { value: 'dental', label: 'Odontológico' },
  { value: 'physiotherapy', label: 'Fisioterapia' },
  { value: 'nutrition', label: 'Nutrição' },
  { value: 'psychology', label: 'Psicologia' },
  { value: 'veterinary', label: 'Veterinário' },
  { value: 'pediatrics', label: 'Pediatria' },
  { value: 'dermatology', label: 'Dermatologia' },
  { value: 'ophthalmology', label: 'Oftalmologia' },
  { value: 'orthopedics', label: 'Ortopedia' },
]

export function CustomAnamnesis() {
  const [serviceType, setServiceType] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    mainComplaint: '',
    allergies: '',
    medications: '',
    lastDentalVisit: '',
    painLevel: '',
    dietaryRestrictions: '',
    previousTreatment: '',
    petName: '',
    petSpecies: '',
    petBreed: '',
    lastVaccination: '',
    skinCondition: '',
    eyeCondition: '',
    jointPain: '',
  })
  const [logo, setLogo] = useState<string | null>(null)
  const [background, setBackground] = useState({
    type: 'solid',
    solidColor: '#ffffff',
    gradientStart: '#ffffff',
    gradientEnd: '#e0e0e0',
    image: null as string | null,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleLogoUpload = (logoUrl: string) => {
    setLogo(logoUrl)
  }

  const handleBackgroundChange = (newBackground: typeof background) => {
    setBackground(newBackground)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted', { formData, logo, background })
  }

  const getBackgroundStyle = () => {
    switch (background.type) {
      case 'solid':
        return { backgroundColor: background.solidColor }
      case 'gradient':
        return { backgroundImage: `linear-gradient(to bottom right, ${background.gradientStart}, ${background.gradientEnd})` }
      case 'image':
        return background.image ? { backgroundImage: `url(${background.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}
      default:
        return {}
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Ficha de Anamnese Personalizada</CardTitle>
        <CardDescription>Personalize e preencha as informações do paciente de acordo com o tipo de serviço</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="serviceType">Tipo de Serviço</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Selecione o tipo de serviço" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nome do paciente" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" name="birthdate" type="date" value={formData.birthdate} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="mainComplaint">Queixa Principal</Label>
                  <Textarea id="mainComplaint" name="mainComplaint" value={formData.mainComplaint} onChange={handleInputChange} placeholder="Descreva a queixa principal do paciente" />
                </div>
                {serviceType === 'medical' && (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="allergies">Alergias</Label>
                      <Input id="allergies" name="allergies" value={formData.allergies} onChange={handleInputChange} placeholder="Liste as alergias conhecidas" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="medications">Medicações em Uso</Label>
                      <Textarea id="medications" name="medications" value={formData.medications} onChange={handleInputChange} placeholder="Liste as medicações em uso" />
                    </div>
                  </>
                )}
                {serviceType === 'dental' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastDentalVisit">Última Visita ao Dentista</Label>
                    <Input id="lastDentalVisit" name="lastDentalVisit" type="date" value={formData.lastDentalVisit} onChange={handleInputChange} />
                  </div>
                )}
                {serviceType === 'physiotherapy' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="painLevel">Nível de Dor (1-10)</Label>
                    <Input id="painLevel" name="painLevel" type="number" min="1" max="10" value={formData.painLevel} onChange={handleInputChange} />
                  </div>
                )}
                {serviceType === 'nutrition' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="dietaryRestrictions">Restrições Alimentares</Label>
                    <Textarea id="dietaryRestrictions" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleInputChange} placeholder="Liste as restrições alimentares" />
                  </div>
                )}
                {serviceType === 'psychology' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="previousTreatment">Tratamentos Anteriores</Label>
                    <Textarea id="previousTreatment" name="previousTreatment" value={formData.previousTreatment} onChange={handleInputChange} placeholder="Descreva tratamentos psicológicos anteriores" />
                  </div>
                )}
                {serviceType === 'veterinary' && (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="petName">Nome do Animal</Label>
                      <Input id="petName" name="petName" value={formData.petName} onChange={handleInputChange} placeholder="Nome do animal" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="petSpecies">Espécie</Label>
                      <Input id="petSpecies" name="petSpecies" value={formData.petSpecies} onChange={handleInputChange} placeholder="Ex: Cão, Gato, etc." />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="petBreed">Raça</Label>
                      <Input id="petBreed" name="petBreed" value={formData.petBreed} onChange={handleInputChange} placeholder="Raça do animal" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lastVaccination">Data da Última Vacinação</Label>
                      <Input id="lastVaccination" name="lastVaccination" type="date" value={formData.lastVaccination} onChange={handleInputChange} />
                    </div>
                  </>
                )}
                {serviceType === 'pediatrics' && (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="parentName">Nome do Responsável</Label>
                      <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Nome do pai/mãe ou responsável" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="childDevelopment">Desenvolvimento da Criança</Label>
                      <Textarea id="childDevelopment" name="childDevelopment" value={formData.childDevelopment} onChange={handleInputChange} placeholder="Descreva o desenvolvimento da criança" />
                    </div>
                  </>
                )}
                {serviceType === 'dermatology' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="skinCondition">Condição da Pele</Label>
                    <Textarea id="skinCondition" name="skinCondition" value={formData.skinCondition} onChange={handleInputChange} placeholder="Descreva a condição da pele" />
                  </div>
                )}
                {serviceType === 'ophthalmology' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="eyeCondition">Condição dos Olhos</Label>
                    <Textarea id="eyeCondition" name="eyeCondition" value={formData.eyeCondition} onChange={handleInputChange} placeholder="Descreva a condição dos olhos" />
                  </div>
                )}
                {serviceType === 'orthopedics' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="jointPain">Dor nas Articulações</Label>
                    <Textarea id="jointPain" name="jointPain" value={formData.jointPain} onChange={handleInputChange} placeholder="Descreva a dor nas articulações" />
                  </div>
                )}
              </div>
            </form>
          </TabsContent>
          <TabsContent value="design">
            <div className="space-y-4">
              <LogoUpload onLogoUpload={handleLogoUpload} />
              <BackgroundCustomizer onBackgroundChange={handleBackgroundChange} />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="border rounded-lg p-6 space-y-4"
              style={getBackgroundStyle()}
            >
              {logo && (
                <div className="flex justify-center mb-4">
                  <Image src={logo} alt="Logo da empresa" width={100} height={100} className="object-contain" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-center">Ficha de Anamnese - {serviceTypes.find(type => type.value === serviceType)?.label || 'Geral'}</h2>
              <div className="grid gap-4">
                <div>
                  <Label className="font-bold">Nome Completo:</Label>
                  <p>{formData.name || 'Não preenchido'}</p>
                </div>
                <div>
                  <Label className="font-bold">Data de Nascimento:</Label>
                  <p>{formData.birthdate || 'Não preenchido'}</p>
                </div>
                <div>
                  <Label className="font-bold">Queixa Principal:</Label>
                  <p>{formData.mainComplaint || 'Não preenchido'}</p>
                </div>
                {serviceType === 'medical' && (
                  <>
                    <div>
                      <Label className="font-bold">Alergias:</Label>
                      <p>{formData.allergies || 'Não preenchido'}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Medicações em Uso:</Label>
                      <p>{formData.medications || 'Não preenchido'}</p>
                    </div>
                  </>
                )}
                {serviceType === 'dental' && (
                  <div>
                    <Label className="font-bold">Última Visita ao Dentista:</Label>
                    <p>{formData.lastDentalVisit || 'Não preenchido'}</p>
                  </div>
                )}
                {serviceType === 'physiotherapy' && (
                  <div>
                    <Label className="font-bold">Nível de Dor (1-10):</Label>
                    <p>{formData.painLevel || 'Não preenchido'}</p>
                  </div>
                )}
                {serviceType === 'nutrition' && (
                  <div>
                    <Label className="font-bold">Restrições Alimentares:</Label>
                    <p>{formData.dietaryRestrictions || 'Não preenchido'}</p>
                  </div>
                )}
                {serviceType === 'psychology' && (
                  <div>
                    <Label className="font-bold">Tratamentos Anteriores:</Label>
                    <p>{formData.previousTreatment || 'Não preenchido'}</p>
                  </div>
                )}
                {serviceType === 'veterinary' && (
                  <>
                    <div>
                      <Label className="font-bold">Nome do Animal:</Label>
                      <p>{formData.petName || 'Não preenchido'}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Espécie:</Label>
                      <p>{formData.petSpecies || 'Não preenchido'}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Raça:</Label>
                      <p>{formData.petBreed || 'Não preenchido'}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Última Vacinação:</Label>
                      <p>{formData.lastVaccination || 'Não preenchido'}</p>
                    </div>
                  </>
                )}
                {serviceType === 'pediatrics' && (
                  <>
                    <div>
                      <Label className="font-bold">Nome do Responsável:</Label>
                      <p>{formData.parentName || 'Não preenchido'}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Desenvolvimento da Criança:</Label>
                      <p>{formData.childDevelopment || 'Não preenchido'}</p>
                    </div>
                  </>
                )}
                {serviceType === 'dermatology' && (
                  <div>
                    <Label className="font-bold">Condição da Pele:</Label>
                    <p>{formData.skinCondition || 'Não preenchido'}</p>
                  </div>
                )}
                {serviceType === 'ophthalmology' && (
                  <div>
                    <Label className="font-bold">Condição dos Olhos:</Label>
                    <p>{formData.eyeCondition || 'Não preenchido'}</p>
                  </div>
                )}
                {serviceType === 'orthopedics' && (
                  <div>
                    <Label className="font-bold">Dor nas Articulações:</Label>
                    <p>{formData.jointPain || 'Não preenchido'}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button type="submit" onClick={handleSubmit}>Salvar Ficha</Button>
      </CardFooter>
    </Card>
  )
}

