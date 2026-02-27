import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function authErrorMessage(code?: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export async function register(email: string, password: string) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err: any) {
    throw new Error(authErrorMessage(err?.code));
  }
}