"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import Cookies from 'js-cookie'; 

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Fichas", href: "/dashboard/forms" },
    { icon: Users, label: "Clientes", href: "/dashboard/clients" },
    { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    Cookies.remove('userAuthenticated');
    Cookies.remove('authToken'); 
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('authToken');
    console.log("deslogando")
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <motion.div
        className="bg-white dark:bg-gray-800 border-r shadow-sm relative"
        animate={{ width: isExpanded ? 240 : 70 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border rounded-full p-1.5 shadow-md"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <div className="p-4">
          <motion.div
            className="font-bold text-xl text-indigo-600 dark:text-indigo-400 flex items-center gap-2"
            animate={{ opacity: isExpanded ? 1 : 0 }}
          >
            {isExpanded ? "EasyForm" : "EF"}
          </motion.div>
        </div>

        <nav className="mt-8 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-1 transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <Link
            href="/dashboard/new-record"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-1 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200`}
          >
            <Plus className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap"
                >
                  Preencher Ficha
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap"
                >
                  Sair
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <main className="flex-1 p-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
