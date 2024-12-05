"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href")?.slice(1);
      const element = document.getElementById(targetId || "");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll('nav a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-auto mr-2"
            />
            <Link
              href="/"
              className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              EasyForm
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="#features"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Funcionalidades
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Como Funciona
            </Link>
            <Link
              href="#plans"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Planos
            </Link>
            <ThemeToggle />
            <Link
              href="/login"
              className="ml-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="ml-4 bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
