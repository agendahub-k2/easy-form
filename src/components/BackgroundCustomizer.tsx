'use client'

import { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

const backgroundOptions = [
  { id: 'solid', name: 'Cor Sólida' },
  { id: 'gradient', name: 'Gradiente' },
  { id: 'image', name: 'Imagem' },
]

interface BackgroundCustomizerProps {
  onBackgroundChange: (background: {
    type: string;
    solidColor: string;
    gradientStart: string;
    gradientEnd: string;
    image: string | null;
  }) => void;
}

export function BackgroundCustomizer({ onBackgroundChange }: BackgroundCustomizerProps) {
  const [backgroundType, setBackgroundType] = useState('solid')
  const [solidColor, setSolidColor] = useState('#ffffff')
  const [gradientStart, setGradientStart] = useState('#ffffff')
  const [gradientEnd, setGradientEnd] = useState('#e0e0e0')
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  useEffect(() => {
    onBackgroundChange({
      type: backgroundType,
      solidColor,
      gradientStart,
      gradientEnd,
      image: backgroundImage,
    })
  }, [backgroundType, solidColor, gradientStart, gradientEnd, backgroundImage, onBackgroundChange])

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setBackgroundImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <Label>Personalização do Fundo</Label>
      <RadioGroup value={backgroundType} onValueChange={setBackgroundType}>
        {backgroundOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id}>{option.name}</Label>
          </div>
        ))}
      </RadioGroup>

      {backgroundType === 'solid' && (
        <div>
          <Label htmlFor="solid-color">Cor de Fundo</Label>
          <Input
            id="solid-color"
            type="color"
            value={solidColor}
            onChange={(e) => setSolidColor(e.target.value)}
          />
        </div>
      )}

      {backgroundType === 'gradient' && (
        <div className="space-y-2">
          <div>
            <Label htmlFor="gradient-start">Cor Inicial</Label>
            <Input
              id="gradient-start"
              type="color"
              value={gradientStart}
              onChange={(e) => setGradientStart(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="gradient-end">Cor Final</Label>
            <Input
              id="gradient-end"
              type="color"
              value={gradientEnd}
              onChange={(e) => setGradientEnd(e.target.value)}
            />
          </div>
        </div>
      )}

      {backgroundType === 'image' && (
        <div>
          <Label htmlFor="background-image">Imagem de Fundo</Label>
          <Input
            id="background-image"
            type="file"
            accept="image/*"
            onChange={handleBackgroundImageUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      )}
    </div>
  )
}

