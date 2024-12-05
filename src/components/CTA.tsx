"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plans = [
  {
    name: "Teste Grátis",
    price: "0",
    duration: "30 dias",
    features: [
      "Acesso a todas as funcionalidades",
      "Até 10 fichas",
      "Suporte por email",
    ],
    cta: "Começar teste grátis",
    highlighted: false,
  },
  {
    name: "Básico",
    price: "49,90",
    duration: "30 dias",
    features: ["Fichas ilimitadas", "Suporte prioritário", "Exportação em PDF"],
    cta: "Assinar plano Básico",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "99,90",
    duration: "30 dias",
    features: [
      "Tudo do plano Básico",
      "Integrações avançadas",
      "Análise de dados",
    ],
    cta: "Assinar plano Pro",
    highlighted: false,
  },
];

const questions = [
  {
    question: "Quantas fichas você precisa gerenciar por mês?",
    options: [
      { text: "Até 10", plan: "Teste Grátis" },
      { text: "Entre 11 e 100", plan: "Básico" },
      { text: "Mais de 100", plan: "Pro" },
    ],
  },
  {
    question:
      "Você precisa de recursos avançados como integrações e análise de dados?",
    options: [
      { text: "Não", plan: "Básico" },
      { text: "Sim", plan: "Pro" },
    ],
  },
  {
    question:
      "Qual é o seu orçamento mensal para um sistema de gerenciamento de fichas?",
    options: [
      { text: "R$ 0", plan: "Teste Grátis" },
      { text: "Até R$ 50", plan: "Básico" },
      { text: "Mais de R$ 50", plan: "Pro" },
    ],
  },
];

export default function CTA() {
  const [recommendedPlan, setRecommendedPlan] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (plan: string) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setRecommendedPlan(plan);
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-indigo-100 to-white py-16 px-4 sm:px-6 lg:px-8"
      id="plans"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Pronto para começar? Escolha seu plano!
        </motion.h2>

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plans">Ver Planos</TabsTrigger>
            <TabsTrigger value="compare">
              Descubra o plano ideal para você!
            </TabsTrigger>
          </TabsList>
          <TabsContent value="plans">
            <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                    plan.highlighted ? "ring-2 ring-indigo-600" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="px-6 py-8">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mt-4 flex items-baseline">
                      <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                        R$ {plan.price}
                      </span>
                      <span className="ml-1 text-xl font-semibold text-gray-500">
                        /{plan.duration}
                      </span>
                    </p>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Check className="h-6 w-6 text-green-500" />
                          </div>
                          <p className="ml-3 text-base text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 py-8 bg-gray-50">
                    <Link
                      href="/signup"
                      className={`block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                        plan.highlighted
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="compare">
            <Card>
              <CardHeader>
                <CardTitle>Descubra o plano ideal para você</CardTitle>
                <CardDescription>
                  Responda algumas perguntas para encontrarmos o melhor plano
                  para suas necessidades.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendedPlan ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">
                      Plano Recomendado: {recommendedPlan}
                    </h3>
                    <p className="mb-4">
                      Com base nas suas respostas, acreditamos que o plano{" "}
                      {recommendedPlan} seja o mais adequado para você.
                    </p>
                    <Button
                      onClick={() => {
                        setRecommendedPlan("");
                        setCurrentQuestion(0);
                      }}
                    >
                      Recomeçar
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {questions[currentQuestion].question}
                    </h3>
                    <div className="space-y-2">
                      {questions[currentQuestion].options.map(
                        (option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleAnswer(option.plan)}
                            className="w-full justify-start text-left"
                          >
                            {option.text}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
