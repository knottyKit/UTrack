// login.hooks.ts
import { useState } from "react";
import { loginWithGoogle, logoutService } from "./login.services";



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