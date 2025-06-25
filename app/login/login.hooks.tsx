// login.hooks.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { loginWithGoogle, logoutService } from "./login.services";
import { auth } from "@/lib/firebase";
// import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (isMounted) {
        setUser(firebaseUser);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { user, loading };
};

export const useLogin = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const login = async () => {
    setLoginLoading(true);
    try {
      await loginWithGoogle(); // calls your service
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutService(); // calls your service
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { login, logout, loginLoading };
};