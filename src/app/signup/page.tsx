"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

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

const questions = [
  {
    question: "Quantas fichas você gerencia por mês?",
    options: [
      { text: "Até 10", plan: "Teste Grátis" },
      { text: "11 a 100", plan: "Básico" },
      { text: "Mais de 100", plan: "Pro" },
    ],
  },
  {
    question: "Você precisa de recursos avançados?",
    options: [
      { text: "Não", plan: "Básico" },
      { text: "Sim", plan: "Pro" },
    ],
  },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendedPlan, setRecommendedPlan] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl) {
      setSelectedPlan(planFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", {
      name,
      email,
      password,
      company,
      role,
      selectedPlan,
    });
    router.push("/dashboard");
  };

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleQuestionAnswer = (answer: string) => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setRecommendedPlan(answer);
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
        className="sm:mx-auto sm:w-full sm:max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Crie sua conta
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle>Informações de Cadastro</CardTitle>
            <CardDescription>
              Preencha seus dados e escolha o melhor plano para você
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Suas Informações</TabsTrigger>
                <TabsTrigger value="plan">Escolha do Plano</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Nome da Empresa</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Cargo</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medico">Médico</SelectItem>
                        <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                        <SelectItem value="fisioterapeuta">
                          Fisioterapeuta
                        </SelectItem>
                        <SelectItem value="nutricionista">
                          Nutricionista
                        </SelectItem>
                        <SelectItem value="psicologo">Psicólogo</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="selectedPlan">Plano Selecionado</Label>
                    <Input
                      id="selectedPlan"
                      name="selectedPlan"
                      type="text"
                      value={selectedPlan}
                      disabled
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Cadastrar
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="plan">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Selecione seu plano
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <motion.div
                          key={plan.name}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedPlan === plan.name
                              ? "ring-2 ring-indigo-500 shadow-lg"
                              : "hover:shadow-md"
                          }`}
                          onClick={() => handlePlanSelect(plan.name)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <h4 className="text-lg font-semibold mb-2">
                            {plan.name}
                          </h4>
                          <p className="text-2xl font-bold mb-2">
                            R$ {plan.price.toFixed(2)}
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              / {plan.duration}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 mb-4">
                            {plan.value}
                          </p>
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm"
                              >
                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {!recommendedPlan && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Descubra o plano ideal para você
                      </h3>
                      <Card>
                        <CardContent className="pt-6">
                          <h4 className="text-md font-semibold mb-4">
                            {questions[currentQuestion].question}
                          </h4>
                          <div className="space-y-2">
                            {questions[currentQuestion].options.map(
                              (option, index) => (
                                <Button
                                  key={index}
                                  onClick={() =>
                                    handleQuestionAnswer(option.plan)
                                  }
                                  className="w-full justify-start text-left"
                                >
                                  {option.text}
                                </Button>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {recommendedPlan && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        Plano Recomendado
                      </h3>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-xl font-bold mb-2">
                            {recommendedPlan}
                          </p>
                          <p className="mb-4">
                            Com base nas suas respostas, acreditamos que o plano{" "}
                            {recommendedPlan} seja o mais adequado para você.
                          </p>
                          <Button
                            onClick={() => setSelectedPlan(recommendedPlan)}
                          >
                            Selecionar {recommendedPlan}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
