import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
        const addItem = useCartStore((state) => state.addItem);

        return (
                <Card className="flex h-full flex-col overflow-hidden">
                        <div className="flex aspect-[4/3] items-center justify-center bg-secondary/50 text-4xl" aria-hidden="true">
                                {product.category === "Potions" ? "⚗" : product.category === "Scrolls" ? "✦" : "◈"}
                        </div>
                        <CardHeader>
                                <div className="flex items-start justify-between gap-3">
                                        <CardTitle>{product.name}</CardTitle>
                                        <span className="shrink-0 font-semibold text-primary">{formatCurrency(product.price)}</span>
                                </div>
                                <CardDescription>{product.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                        </CardContent>
                        <CardFooter>
                                <Button className="w-full" onClick={() => addItem(product)}>
                                        <ShoppingCart className="size-4" />
                                        Add to cart
                                </Button>
                        </CardFooter>
                </Card>
        );
}
