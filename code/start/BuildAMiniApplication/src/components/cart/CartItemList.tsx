import type { CartItem as CartItemType } from "@/stores/cart-store";
import { CartItem } from "@/components/cart/CartItem";

type CartItemListProps = {
        items: CartItemType[];
        onQuantityChange: (productId: string, quantity: number) => void;
        onRemove: (productId: string) => void;
};

export function CartItemList({ items, onQuantityChange, onRemove }: CartItemListProps) {
        return (
                <div className="space-y-4" aria-label="Cart items">
                        {items.map((item) => (
                                <CartItem
                                        key={item.id}
                                        item={item}
                                        onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
                                        onRemove={() => onRemove(item.id)}
                                />
                        ))}
                </div>
        );
}
