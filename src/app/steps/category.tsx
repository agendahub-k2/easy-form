import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Lista expandida de categorias
const allCategories = [
  { id: "fisioterapeuta", name: "Fisioterapeuta" },
  { id: "nutricionista", name: "Nutricionista" },
  { id: "psicologo", name: "Psicólogo" },
  { id: "medico", name: "Médico" },
  { id: "enfermeiro", name: "Enfermeiro" },
  { id: "dentista", name: "Dentista" },
  { id: "farmaceutico", name: "Farmacêutico" },
  { id: "biomedico", name: "Biomédico" },
  { id: "veterinario", name: "Veterinário" },
  { id: "fonoaudiologo", name: "Fonoaudiólogo" },
  { id: "terapeuta_ocupacional", name: "Terapeuta Ocupacional" },
  { id: "educador_fisico", name: "Educador Físico" },
  { id: "quiropraxista", name: "Quiropraxista" },
  { id: "osteopata", name: "Osteopata" },
  { id: "acupunturista", name: "Acupunturista" },
  { id: "massoterapeuta", name: "Massoterapeuta" },
  { id: "naturologista", name: "Naturólogo" },
  { id: "homeopata", name: "Homeopata" },
  { id: "podologo", name: "Podólogo" },
  { id: "optometrista", name: "Optometrista" },
  // ... Adicione mais
  { id: "outro", name: "Outro" },
];

export function CategoryStep({ formData, updateFormData }) {
  const [selectedCategory, setSelectedCategory] = useState(formData.category);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(allCategories);

  useEffect(() => {
    const filtered = allCategories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    updateFormData({ category });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <div className="max-h-60 overflow-y-auto">
        {filteredCategories.map((category) => (
          <motion.button
            key={category.id}
            className={`p-2 w-full text-left rounded-lg border mb-2 ${
              selectedCategory === category.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                : "border-gray-200 dark:border-gray-700"
            } flex items-center justify-between`}
            onClick={() => handleCategorySelect(category.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{category.name}</span>
            {selectedCategory === category.id && (
              <Check className="h-5 w-5 text-blue-500" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
