"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
}

export function Auth({ children }: AuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
} 