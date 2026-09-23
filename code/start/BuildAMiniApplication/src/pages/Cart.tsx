import { Link } from "react-router-dom";

import { CartItemList } from "@/components/cart/CartItemList";
import { CartSummary } from "@/components/cart/CartSummary";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

export default function Cart() {
        const items = useCartStore((state) => state.items);
        const updateQuantity = useCartStore((state) => state.updateQuantity);
        const removeItem = useCartStore((state) => state.removeItem);
        const getItemCount = useCartStore((state) => state.getItemCount);
        const getSubtotal = useCartStore((state) => state.getSubtotal);
        const itemCount = getItemCount();
        const subtotal = getSubtotal();

        return (
                <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-12">
                        <section>
                                <p className="text-sm font-medium uppercase tracking-wider text-primary">Your workshop cart</p>
                                <h1 className="mt-3 text-4xl font-semibold tracking-tight">Ready when you are.</h1>
                                <p className="mt-3 max-w-xl text-muted-foreground">Review your crafted collection before checkout.</p>
                        </section>

                        {items.length === 0 ? (
                                <section className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                                        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                                        <p className="mt-2 max-w-md text-muted-foreground">Browse the workshop collection and add something made for your adventure.</p>
                                        <Button asChild className="mt-6">
                                                <Link to="/products">Browse products</Link>
                                        </Button>
                                </section>
                        ) : (
                                <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_20rem]">
                                        <CartItemList items={items} onQuantityChange={updateQuantity} onRemove={removeItem} />
                                        <CartSummary itemCount={itemCount} subtotal={subtotal} />
                                </div>
                        )}

                        <Footer />
                </div>
        );
}