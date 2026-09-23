import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type QuantitySelectorProps = {
        quantity: number;
        onChange: (quantity: number) => void;
};

export function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
        return (
                <div className="flex items-center rounded-md border" aria-label="Quantity selector">
                        <Button
                                aria-label="Decrease quantity"
                                disabled={quantity <= 1}
                                onClick={() => onChange(quantity - 1)}
                                size="icon"
                                type="button"
                                variant="ghost"
                        >
                                <Minus className="size-4" />
                        </Button>
                        <span className="min-w-8 text-center text-sm font-medium" aria-live="polite">
                                {quantity}
                        </span>
                        <Button
                                aria-label="Increase quantity"
                                onClick={() => onChange(quantity + 1)}
                                size="icon"
                                type="button"
                                variant="ghost"
                        >
                                <Plus className="size-4" />
                        </Button>
                </div>
        );
}
