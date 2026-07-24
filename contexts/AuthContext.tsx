"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAdminStore } from "@/store/adminStore";

interface AuthContextValue {
  token: string | null;
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
  ready: boolean;
  setAuth: (token: string, name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token, name, email, setAuth, logout } = useAdminStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        name,
        email,
        isAuthenticated: !!token,
        ready,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
