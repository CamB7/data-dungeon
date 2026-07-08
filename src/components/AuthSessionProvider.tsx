"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth/client";

const SESSION_VERIFIER_PARAM = "neon_auth_session_verifier";

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has(SESSION_VERIFIER_PARAM)) {
      return;
    }

    void authClient.getSession();
  }, []);

  return <>{children}</>;
}
