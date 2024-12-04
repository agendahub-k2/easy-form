"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-white sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">Pronto para começar?</span>
          <span className="block">Crie sua conta hoje mesmo.</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-6 text-indigo-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Experimente nosso sistema de gerenciamento de fichas gratuitamente por
          30 dias. Sem compromisso, cancele a qualquer momento.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto transition-colors duration-300"
          >
            Comece seu teste grátis
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
