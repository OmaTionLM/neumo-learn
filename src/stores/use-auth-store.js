import { create } from "zustand";
import { onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";


const useAuthStore = create((set) => {
    const observeAuthState = () => {
        onAuthStateChanged(auth, (user) => {
            user ? set({ userLooged: user }) : set({ userLooged: null });
    });
};
observeAuthState();
  return {
    userLooged: null,

    loginGoogleWithPopup: async () => {
        try{
            return await signInWithPopup(auth, new GoogleAuthProvider())
        } catch(error) {
            console.error("Error al inciar con Google: ", error);
        }
  },

  logout: async () => {
    signOut(auth)
      .then(() => set({ userLooged: null }))
      .catch((error) => console.error("Error al cerrar sesión: ", error));
       
  }
};
});

export default useAuthStore;
