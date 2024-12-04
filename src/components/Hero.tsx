"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundWrapper } from "./BackgroundWrapper";

export default function Hero() {
  return (
    <BackgroundWrapper className="bg-transparent">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">Simplifique o Gerenciamento</span>
            <span className="block text-indigo-600">
              de Formulários e Fichas de Anamnese
            </span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Crie, personalize e gerencie formulários e fichas de Anamnese com
            facilidade. Desde anamneses até pesquisas de satisfação, tudo em um
            só lugar.
          </motion.p>
          <motion.div
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="rounded-md shadow">
              <Link
                href="/signup"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
              >
                Comece Agora
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/about"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
              >
                Saiba Mais
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
