"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    name: "Crie sua ficha",
    description: "Use templates ou crie do zero uma ficha personalizada.",
  },
  {
    id: "02",
    name: "Cadastre o cliente",
    description: "Adicione as informações básicas do seu cliente.",
  },
  {
    id: "03",
    name: "Envie o link",
    description: "O cliente recebe um link ou SMS para preencher a ficha.",
  },
  {
    id: "04",
    name: "Receba os dados",
    description: "Acesse as informações preenchidas pelo cliente.",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Como Funciona
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simplifique o processo de coleta de informações
          </p>
        </motion.div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                className="relative pl-16"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <span className="text-lg font-semibold leading-7 text-white">
                      {step.id}
                    </span>
                  </div>
                  {step.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {step.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
