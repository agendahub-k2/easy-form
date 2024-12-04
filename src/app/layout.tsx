import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FloatingButtons } from "../components/FloatingButtons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyForm - Sistema de Gerenciamento de Formulários",
  description: "Crie, personalize e gerencie formulários com facilidade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}
