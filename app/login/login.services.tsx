import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const logoutService = async () => {
  await signOut(auth);
};
