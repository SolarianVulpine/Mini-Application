import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import {
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselNext,
        CarouselPrevious,
} from "@/components/ui/carousel";

const featuredNames = ["Longsword", "Kite Shield", "Plate Armor", "Healing Potion", "Scroll of Fireball", "Ring of Strength"];

export function FeaturedProducts() {
        const addItem = useCartStore((state) => state.addItem);
        const featuredProducts = featuredNames
                .map((name) => products.find((product) => product.name === name))
                .filter((product) => product !== undefined);

        return (
                <section aria-labelledby="featured-products-heading" className="min-w-0 space-y-5">
                        <div>
                                <p className="text-sm font-medium uppercase tracking-wider text-primary">Featured collection</p>
                                <h2 id="featured-products-heading" className="mt-2 text-2xl font-semibold tracking-tight">Made for the quest ahead</h2>
                        </div>
                        <Carousel className="mx-8 min-w-0 max-w-full" opts={{ align: "start", loop: false }}>
                                <CarouselContent className="-ml-4 pb-3">
                                        {featuredProducts.map((product) => (
                                                <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 xl:basis-1/3">
                                                        <Card className="flex h-full flex-col">
                                                                <div className="flex h-32 items-center justify-center bg-secondary/50 text-sm font-medium text-secondary-foreground">
                                                                        {product.category}
                                                                </div>
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                                                        <p className="text-sm text-muted-foreground">{product.description}</p>
                                                                </CardHeader>
                                                                <CardContent className="flex-1">
                                                                        <p className="font-semibold text-primary">{formatCurrency(product.price)}</p>
                                                                </CardContent>
                                                                <CardFooter>
                                                                        <Button className="w-full" onClick={() => addItem(product)}>
                                                                                <ShoppingCart className="size-4" />
                                                                                Add to cart
                                                                        </Button>
                                                                </CardFooter>
                                                        </Card>
                                                </CarouselItem>
                                        ))}
                                </CarouselContent>
                                <CarouselPrevious aria-label="Previous featured products" className="left-2" />
                                <CarouselNext aria-label="Next featured products" className="right-2" />
                        </Carousel>
                </section>
        );
}
