import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Teste Grátis",
    price: 0,
    duration: "30 dias",
    features: [
      "Acesso a todas as funcionalidades",
      "Até 10 fichas",
      "Suporte por email",
    ],
    color: "bg-green-500",
    value: "Para quem quer experimentar",
  },
  {
    name: "Básico",
    price: 49.9,
    duration: "30 dias",
    features: ["Fichas ilimitadas", "Suporte prioritário", "Exportação em PDF"],
    color: "bg-blue-500",
    value: "Ideal para profissionais individuais",
  },
  {
    name: "Pro",
    price: 99.9,
    duration: "30 dias",
    features: [
      "Tudo do plano Básico",
      "Integrações avançadas",
      "Análise de dados",
    ],
    color: "bg-purple-500",
    value: "Perfeito para clínicas e equipes",
  },
];

export function PlanSelectionStep({ formData, updateFormData }) {
  const [selectedPlan, setSelectedPlan] = useState(formData.selectedPlan);

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    updateFormData({ selectedPlan: planName });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Escolha o plano que melhor atende às suas necessidades:
      </p>
      <div className="space-y-4">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            className={`p-4 rounded-lg border ${
              selectedPlan === plan.name
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                : "border-gray-200 dark:border-gray-700"
            }`}
            onClick={() => handlePlanSelect(plan.name)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              {selectedPlan === plan.name && (
                <Check className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {plan.value}
            </p>
            <p className="text-xl font-bold mt-2">
              {plan.price === 0
                ? "Grátis"
                : `R$${plan.price.toFixed(2)} / ${plan.duration}`}
            </p>
            <ul className="mt-2 space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
