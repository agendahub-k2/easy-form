import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/components/util/formatPhoneNumber";
import { AlertCircle } from "lucide-react";

export function PersonalInfoStep({ formData, updateFormData }) {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Nome não pode ser vazio";
        else if (value.length < 3 || value.length > 15)
          error = "Nome deve ter entre 3 e 15 caracteres";
        break;
      case "email":
        if (!value) error = "Email não pode ser vazio";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email inválido";
        break;
      case "phone":
        if (!value) error = "Telefone não pode ser vazio";
        else if (value.replace(/\D/g, "").length !== 11)
          error = "Telefone inválido";
        break;
      case "password":
        if (!value) error = "Senha não pode ser vazia";
        else if (value.length < 4 || value.length > 15)
          error = "Senha deve ter entre 4 e 15 caracteres";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    validateField(name, value);
  };

  return (
    <div className="space-y-4">
      {["name", "email", "phone", "password"].map((field) => (
        <div key={field}>
          <Label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          <Input
            id={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            value={formData[field]}
            onChange={handleChange}
            onBlur={(e) => validateField(field, e.target.value)}
            className={errors[field] ? "border-red-500" : ""}
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors[field]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
