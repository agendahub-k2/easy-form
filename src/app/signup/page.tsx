"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalInfoStep } from "../steps/personal-info";
import { CategoryStep } from "../steps/category";
import { PlanSelectionStep } from "../steps/plan-selection";
import { ConfirmationStep } from "../steps/confirmation";
import { createUser } from "@/service/api";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const steps = [
  "Informações Pessoais",
  "Categoria",
  "Escolha do Plano",
  "Confirmação",
];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    category: "",
    selectedPlan: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    // Validate all fields
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        errors[key] = `${key} não pode ser vazio`;
      }
    });

    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      setAlert({
        type: "error",
        message: "Por favor, preencha todos os campos corretamente.",
      });
      return;
    }

    try {
      const response = await createUser(formData);
      console.log("Usuário criado com sucesso:", response);
      setAlert({ type: "success", message: "Cadastro realizado com sucesso!" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setAlert({
        type: "error",
        message: "Houve um erro ao tentar criar a conta. Tente novamente.",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-500"
      style={{
        backgroundImage: "url('/assets/background_login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </Button>
      </div>

      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Crie sua conta
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {alert.message && (
          <Alert
            className={`mb-4 ${
              alert.type === "error"
                ? "bg-red-100 dark:bg-red-900"
                : "bg-green-100 dark:bg-green-900"
            }`}
          >
            <AlertTitle>
              {alert.type === "error" ? "Erro" : "Sucesso"}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle>{steps[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    index <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                      index <= currentStep
                        ? "border-blue-600"
                        : "border-gray-400"
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-full ${
                        index < currentStep ? "bg-blue-600" : "bg-gray-400"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <PersonalInfoStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 1 && (
                  <CategoryStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 2 && (
                  <PlanSelectionStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 3 && <ConfirmationStep formData={formData} />}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handlePrevStep} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNextStep}>
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Criar Conta</Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
