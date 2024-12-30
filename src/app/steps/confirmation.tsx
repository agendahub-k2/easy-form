import { Check } from "lucide-react";

export function ConfirmationStep({ formData }) {
  const fields = [
    { label: "Nome", value: formData.name },
    { label: "Email", value: formData.email },
    { label: "Telefone", value: formData.phone },
    { label: "Categoria", value: formData.category },
    { label: "Plano Selecionado", value: formData.selectedPlan },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Confirme seus dados</h3>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
          >
            <Check className="h-5 w-5 text-green-500" />
            <span className="font-medium">{field.label}:</span>
            <span>{field.value}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Por favor, verifique se todas as informações estão corretas antes de
        criar sua conta.
      </p>
    </div>
  );
}
