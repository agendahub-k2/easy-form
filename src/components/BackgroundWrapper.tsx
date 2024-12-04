"use client";

import Image from "next/image";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundWrapper({
  children,
  className = "",
}: BackgroundWrapperProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <Image
        src="/assets/background_login.png"
        alt="Background"
        fill
        className="object-cover pointer-events-none"
        priority
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
