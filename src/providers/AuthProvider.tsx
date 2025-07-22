"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, googleProvider } from "@/firebase/firebase-client";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { AuthContextType, AuthUser } from "@/types/auth";
import { FirestoreService } from "@/firebase/firestoreService";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,

  signInWithGoogle: async () => {
    throw new Error("AuthProvider not found");
  },
  signOut: async () => {
    throw new Error("AuthProvider not found");
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        const adminDoc = (
          await FirestoreService.getWhere("Authorized-Admins/document/admin", [
            ["email", "==", user.email],
          ])
        )[0] as { id: string; email: string };

        console.log(adminDoc, "--admin doc--");

        if (adminDoc) {
          setUser({
            id: adminDoc.id,
            email: adminDoc.email,
            role: "admin",
          });
        }
      }

      // console.log(user, "--Auth state--");
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    // Check if user exists in Firestore
    await sendToken(await result.user.getIdToken());
  };

  const sendToken = async (token: string) => {
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  };

  const removeToken = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  const logout = async () => {
    await removeToken();
    return signOut(auth);
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle: googleLogin,
    signOut: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
