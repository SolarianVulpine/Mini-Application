import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";

type CartSummaryProps = {
        itemCount: number;
        subtotal: number;
};

export function CartSummary({ itemCount, subtotal }: CartSummaryProps) {
        return (
                <Card className="h-fit md:sticky md:top-24">
                        <CardHeader>
                                <CardTitle>Order summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>{itemCount} items</span>
                                        <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                                        <span>Total</span>
                                        <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <Button className="w-full" disabled={itemCount === 0} type="button">
                                        Proceed to checkout
                                </Button>
                                <Button asChild className="w-full" variant="outline">
                                        <Link to="/products">Continue shopping</Link>
                                </Button>
                        </CardContent>
                </Card>
        );
}
