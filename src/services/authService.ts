import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function authErrorMessage(code?: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Cet email est déjà utilisé.";
    case "auth/invalid-email":
      return "Veuillez entrer un email valide.";
    case "auth/weak-password":
      return "Le mot de passe doit contenir au moins 6 caractères.";
    case "auth/user-not-found":
      return "Aucun compte trouvé avec cet email.";
    case "auth/wrong-password":
      return "Mot de passe incorrect.";
    case "auth/invalid-credential":
      return "Email ou mot de passe incorrect.";
    case "auth/network-request-failed":
      return "Erreur réseau. Vérifiez votre connexion.";
    default:
      return "Une erreur est survenue. Veuillez réessayer.";
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

export async function login(email: string, password: string) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err: any) {
    throw new Error(authErrorMessage(err?.code));
  }
}