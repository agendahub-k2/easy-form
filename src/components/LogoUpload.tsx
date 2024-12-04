'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

interface LogoUploadProps {
  onLogoUpload: (logoUrl: string) => void
}

export function LogoUpload({ onLogoUpload }: LogoUploadProps) {
  const [logo, setLogo] = useState<string | null>(null)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLogo(result)
        onLogoUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="logo-upload">Logo da Empresa</Label>
      <Input
        id="logo-upload"
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {logo && (
        <div className="mt-2">
          <Image src={logo} alt="Logo da empresa" width={100} height={100} className="object-contain" />
        </div>
      )}
    </div>
  )
}

