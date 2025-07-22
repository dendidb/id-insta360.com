"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CmsRoot() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push("/cms/dashboard");
  }, [router]);

  return null; // No need to render anything as we're redirecting
} 