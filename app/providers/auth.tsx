import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

type User = { id: string; email?: string | null; provider?: "email" | "google" };
type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "@fairtrack:user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function persist(u: User | null) {
    setUser(u);
    if (u) await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else await AsyncStorage.removeItem(STORAGE_KEY);
  }

  // --- Fake email auth (replace with Firebase/Supabase later) ---
  async function signInEmail(email: string, _password: string) {
    // TODO: real validation
    if (!email.includes("@")) throw new Error("Please enter a valid email.");
    await persist({ id: "local-" + Date.now(), email, provider: "email" });
  }
  async function signUpEmail(email: string, _password: string) {
    if (!email.includes("@")) throw new Error("Please enter a valid email.");
    await persist({ id: "local-" + Date.now(), email, provider: "email" });
  }

  // --- Google sign-in placeholder (wire to Firebase later) ---
  async function signInGoogle() {
    Alert.alert("Google Sign-In", "Replace with real Google OAuth (Firebase/Supabase).");
    await persist({ id: "google-" + Date.now(), provider: "google", email: null });
  }

  async function signOut() {
    await persist(null);
  }

  const value = useMemo(
    () => ({ user, loading, signInEmail, signUpEmail, signInGoogle, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
