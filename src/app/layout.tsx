import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyForm",
  description: "Crie, personalize e gerencie formulários com facilidade.",
  icons: {
    icon: "/assets/logo.png",
    apple: "/apple-icon.png",
    shortcut: "/shortcut-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo.png" type="image/png" />

        <link rel="shortcut icon" href="/assets/logo.png" type="image/png" />

        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
