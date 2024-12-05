"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-full transition-all duration-300 ease-in-out"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400 transition-all duration-300 ease-in-out" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 transition-all duration-300 ease-in-out" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
