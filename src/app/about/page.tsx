import Link from "next/link";
import { ArrowLeft, ClipboardList, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar para a página inicial
        </Link>

        <h1 className="text-4xl font-extrabold text-indigo-900 mb-8">
          Sobre a EasyForm
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Nossa Missão
            </h2>
            <p className="text-gray-700 mb-4">
              Na EasyForm, nossa missão é simplificar o processo de coleta e
              gerenciamento de informações, atendendo não apenas à área de
              saúde, mas também a diversas outras áreas que lidam com fichas de
              anamnesys. Acreditamos que, ao otimizar esse processo, conseguimos
              aumentar a eficiência e a qualidade no atendimento, permitindo que
              profissionais de diferentes setores dediquem mais tempo ao que
              realmente importa: suas atividades principais.
            </p>
            <p className="text-gray-700">
              Fundada em 2024, nossa equipe combina expertise em tecnologia e
              gestão de dados para criar soluções inovadoras que atendem às
              necessidades específicas de profissionais de diversas áreas, como
              saúde, educação, jurídico, e mais. Nosso objetivo é transformar o
              modo como os dados são coletados, organizados e analisados,
              proporcionando uma experiência mais fluida e eficaz para todos os
              usuários.
            </p>
          </div>
          <div>
            <img
              src="/assets/logo.png"
              alt="Equipe EasyForm"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-indigo-800 mb-8">
          Como Gerenciar Fichas e Formulários de Anamnese
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-indigo-600" />
                Crie Formulários Personalizados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Utilize nossa interface intuitiva para criar formulários de
                anamnese personalizados para diferentes especialidades médicas.
                Adicione campos relevantes e organize-os de acordo com suas
                necessidades.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-indigo-600" />
                Gerencie Pacientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Mantenha um registro organizado de todos os seus pacientes.
                Acesse facilmente o histórico de anamneses, atualize informações
                e acompanhe o progresso do tratamento ao longo do tempo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-indigo-600" />
                Agilize o Processo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Envie formulários para preenchimento prévio pelos pacientes,
                economizando tempo durante as consultas. Analise as respostas
                rapidamente e foque no que é mais importante durante o
                atendimento.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-indigo-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-gray-700 mb-6">
            Junte-se a milhares de profissionais de saúde que já estão
            otimizando sua prática com a EasyForm.
          </p>
          <Button asChild>
            <Link href="/signup">Comece agora gratuitamente</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
