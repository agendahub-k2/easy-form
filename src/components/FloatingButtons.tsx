"use client";

import { useState, useCallback } from "react";
import { HelpCircle, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingButtons() {
  const [showHelp, setShowHelp] = useState(false);

  const scrollToContactForm = useCallback(() => {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
      setShowHelp(false); // Close the help panel after clicking
    } else {
      // If the contact form is not found on the current page, navigate to the home page with the contact form
      window.location.href = "/#contact-form";
    }
  }, []);

  return (
    <div className="fixed right-6 bottom-6 flex flex-col items-end space-y-4 z-50">
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-xs"
          >
            <h3 className="font-bold text-lg mb-4 text-indigo-700">
              Como podemos ajudar?
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal hover:bg-indigo-50"
                asChild
              >
                <Link
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2 text-green-600"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                  </svg>
                  Fale conosco no WhatsApp
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal hover:bg-indigo-50"
                onClick={scrollToContactForm}
              >
                <Mail size={20} className="mr-2 text-indigo-600" />
                Envie-nos um e-mail
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ rotate: showHelp ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          size="icon"
          variant="outline"
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full w-14 h-14 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => setShowHelp(!showHelp)}
        >
          {showHelp ? <X size={24} /> : <HelpCircle size={24} />}
        </Button>
      </motion.div>
    </div>
  );
}
