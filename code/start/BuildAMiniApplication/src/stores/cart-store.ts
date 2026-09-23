import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = {
        id: string;
        name: string;
        price: number;
        description?: string;
        image?: string;
        category?: string;
};

export type CartItem = CartProduct & {
        quantity: number;
};

type CartStore = {
        items: CartItem[];
        addItem: (product: CartProduct) => void;
        removeItem: (productId: string) => void;
        updateQuantity: (productId: string, quantity: number) => void;
        clearCart: () => void;
        getItemCount: () => number;
        getSubtotal: () => number;
};

export const useCartStore = create<CartStore>()(
        persist(
                (set, get) => ({
                        items: [],
                        addItem: (product) =>
                                set((state) => {
                                        const existingItem = state.items.find((item) => item.id === product.id);

                                        if (existingItem) {
                                                return {
                                                        items: state.items.map((item) =>
                                                                item.id === product.id
                                                                        ? { ...item, quantity: item.quantity + 1 }
                                                                        : item,
                                                        ),
                                                };
                                        }

                                        return { items: [...state.items, { ...product, quantity: 1 }] };
                                }),
                        removeItem: (productId) =>
                                set((state) => ({
                                        items: state.items.filter((item) => item.id !== productId),
                                })),
                        updateQuantity: (productId, quantity) =>
                                set((state) => ({
                                        items:
                                                quantity > 0
                                                        ? state.items.map((item) =>
                                                                item.id === productId ? { ...item, quantity } : item,
                                                        )
                                                        : state.items.filter((item) => item.id !== productId),
                                })),
                        clearCart: () => set({ items: [] }),
                        getItemCount: () =>
                                get().items.reduce((total, item) => total + item.quantity, 0),
                        getSubtotal: () =>
                                get().items.reduce((total, item) => total + item.price * item.quantity, 0),
                }),
                { name: "workshop-cart" },
        ),
);
