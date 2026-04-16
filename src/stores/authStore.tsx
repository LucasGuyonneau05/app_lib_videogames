import { create } from "zustand";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, type User } from "firebase/auth";

type AuthState = {
    user: User | null
    login: (email: string, pass: string) => void
    logout: () => void
    register: (email: string, pass: string) => void

}

export const useAuth = create<AuthState>((set) => ({
    user: null,

    login: async (email: string, pass: string) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, pass);
            set({ user: userCredentials.user });
        }
        catch (error) {
            console.log(error);
        }
    },

    logout: () => {
        try {
            set({ user: null });
        }
        catch (error) {
            console.log(error);
        }
    },

    register: async (email: string, pass: string) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, pass);
            set({ user: userCredentials.user });
        }
        catch (error) {
            console.log(error);
        }
    }
}))