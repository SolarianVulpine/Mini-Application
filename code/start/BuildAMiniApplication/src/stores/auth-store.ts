import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authenticateWorker } from "@/api/auth-api";

type AuthStore = {
        isAuthenticated: boolean;
        email: string | null;
        login: (email: string, password: string) => Promise<void>;
        logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
        persist(
                (set) => ({
                        isAuthenticated: false,
                        email: null,
                        login: async (email, password) => {
                                const worker = await authenticateWorker(email, password);
                                set({ isAuthenticated: true, email: worker.email });
                        },
                        logout: () => set({ isAuthenticated: false, email: null }),
                }),
                { name: "workshop-worker-session" },
        ),
);
