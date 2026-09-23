import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
        isAuthenticated: boolean;
        email: string | null;
        login: (email: string, password: string) => boolean;
        logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
        persist(
                (set) => ({
                        isAuthenticated: false,
                        email: null,
                        login: (email, password) => {
                                const isWorker = email.trim().toLowerCase() === "worker@workshop.local" && password === "workshop";
                                if (isWorker) set({ isAuthenticated: true, email: email.trim().toLowerCase() });
                                return isWorker;
                        },
                        logout: () => set({ isAuthenticated: false, email: null }),
                }),
                { name: "workshop-worker-session" },
        ),
);
