import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

// Proveedor de Google
const provider = new GoogleAuthProvider();

// Iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Devuelve la información del usuario
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    return null;
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
