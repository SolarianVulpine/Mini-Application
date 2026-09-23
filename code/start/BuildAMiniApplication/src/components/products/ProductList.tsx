import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/types/product";

export function ProductList() {
        const [searchParams] = useSearchParams();
        const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");
        const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";
        const visibleProducts = (selectedCategory === "All"
                ? products
                : products.filter((product) => product.category === selectedCategory)
        ).filter((product) =>
                !searchQuery
                || product.name.toLowerCase().includes(searchQuery)
                || product.category.toLowerCase().includes(searchQuery)
                || product.description.toLowerCase().includes(searchQuery),
        );

        return (
                <div className="grid gap-8 lg:grid-cols-[12rem_1fr]">
                        <aside className="sm:sticky sm:top-16 sm:self-start sm:bg-background/95 sm:pt-2 sm:backdrop-blur sm:supports-[backdrop-filter]:bg-background/80">
                                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</h2>
                                <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                                        {["All", ...categories].map((category) => (
                                                <Button
                                                        key={category}
                                                        className={cn("justify-start whitespace-nowrap", selectedCategory === category && "bg-accent text-accent-foreground")}
                                                        onClick={() => setSelectedCategory(category as ProductCategory | "All")}
                                                        variant="ghost"
                                                >
                                                        {category}
                                                </Button>
                                        ))}
                                </div>
                        </aside>
                        <section aria-live="polite">
                                <div className="mb-5 flex items-end justify-between gap-4">
                                        <div>
                                                <p className="text-sm text-muted-foreground">Workshop collection</p>
                                                <h1 className="text-3xl font-semibold tracking-tight">{searchQuery ? `Results for "${searchParams.get("q")}"` : selectedCategory}</h1>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{visibleProducts.length} items</p>
                                </div>
                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                                        {visibleProducts.length === 0 && (
                                                <p className="col-span-full rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                                                        No products match your search.
                                                </p>
                                        )}
                                </div>
                        </section>
                </div>
        );
}
// List of product categories: Swords, Shields, Armor, Potions, Scrolls, Accessories
// List of products (six products per category) and their prices: Swords: Longsword: $100, Shortsword: $50, Katana: $200, Rapier: $150, Scimitar: $120, Greatsword: $250; Shields: Buckler: $30, Kite Shield: $80, Tower Shield: $150, Round Shield: $60, Heater Shield: $100, Pavise: $200; Armor: Leather Armor: $75, Chainmail Armor: $125, Plate Armor: $250, Scale Armor: $175, Brigandine Armor: $200, Gambeson: $50; Potions: Healing Potion: $25, Mana Potion: $30, Strength Potion: $40, Invisibility Potion: $50, Speed Potion: $35, Fire Resistance Potion: $45; Scrolls: Scroll of Fireball: $60, Scroll of Teleportation: $75, Scroll of Summoning: $80, Scroll of Protection: $90, Scroll of Healing: $85, Scroll of Invisibility: $95; Accessories: Ring of Strength: $100, Amulet of Health: $125, Belt of Giant Strength: $150, Cloak of Invisibility: $200, Boots of Speed: $75, Gloves of Dexterity: $60
// List of 'Featured Products' (one product per category) and percent of sale: Longsword: 10%, Kite Shield: 15%, Plate Armor: 20%, Healing Potion: 25%, Scroll of Fireball: 30%, Ring of Strength: 35%
