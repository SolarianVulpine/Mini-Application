import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import type { CartItem as CartItemType } from "@/stores/cart-store";
import { QuantitySelector } from "@/components/cart/QuantitySelector";

type CartItemProps = {
        item: CartItemType;
        onQuantityChange: (quantity: number) => void;
        onRemove: () => void;
};

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
        return (
                <Card>
                        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                                <div className="flex size-20 shrink-0 items-center justify-center rounded-md bg-secondary/60 text-2xl" aria-hidden="true">
                                        {item.category === "Potions" ? "⚗" : item.category === "Scrolls" ? "✦" : "◈"}
                                </div>
                                <div className="min-w-0 flex-1">
                                        <h2 className="font-semibold">{item.name}</h2>
                                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                                        <p className="mt-2 font-medium text-primary">{formatCurrency(item.price)} each</p>
                                </div>
                                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                        <QuantitySelector quantity={item.quantity} onChange={onQuantityChange} />
                                        <Button aria-label={`Remove ${item.name} from cart`} onClick={onRemove} size="icon" type="button" variant="ghost">
                                                <Trash2 className="size-4" />
                                        </Button>
                                </div>
                        </CardContent>
                </Card>
        );
}
