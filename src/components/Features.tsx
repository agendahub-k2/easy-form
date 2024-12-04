"use client";

import {
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const features = [
  {
    name: "Templates Personalizáveis",
    description:
      "Crie fichas a partir de templates pré-definidos ou comece do zero.",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Preenchimento Remoto",
    description:
      "Envie links ou SMS para que os clientes preencham as fichas remotamente.",
    icon: PencilSquareIcon,
  },
  {
    name: "Gerenciamento de Clientes",
    description: "Cadastre e gerencie seus clientes em um só lugar.",
    icon: UserGroupIcon,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="lg:text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Funcionalidades
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Uma melhor maneira para fazer gerenciamento!
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nosso sistema oferece todas as ferramentas necessárias para
            simplificar o processo de criação e gerenciamento de fichas de
            clientes.
          </p>
        </motion.div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
