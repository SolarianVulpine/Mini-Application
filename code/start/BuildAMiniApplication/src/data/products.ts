import type { Product, ProductCategory } from "@/types/product";

const productGroups: Record<ProductCategory, Array<[string, number]>> = {
        Swords: [["Longsword", 100], ["Shortsword", 50], ["Katana", 200], ["Rapier", 150], ["Scimitar", 120], ["Greatsword", 250]],
        Shields: [["Buckler", 30], ["Kite Shield", 80], ["Tower Shield", 150], ["Round Shield", 60], ["Heater Shield", 100], ["Pavise", 200]],
        Armor: [["Leather Armor", 75], ["Chainmail Armor", 125], ["Plate Armor", 250], ["Scale Armor", 175], ["Brigandine Armor", 200], ["Gambeson", 50]],
        Potions: [["Healing Potion", 25], ["Mana Potion", 30], ["Strength Potion", 40], ["Invisibility Potion", 50], ["Speed Potion", 35], ["Fire Resistance Potion", 45]],
        Scrolls: [["Scroll of Fireball", 60], ["Scroll of Teleportation", 75], ["Scroll of Summoning", 80], ["Scroll of Protection", 90], ["Scroll of Healing", 85], ["Scroll of Invisibility", 95]],
        Accessories: [["Ring of Strength", 100], ["Amulet of Health", 125], ["Belt of Giant Strength", 150], ["Cloak of Invisibility", 200], ["Boots of Speed", 75], ["Gloves of Dexterity", 60]],
};

export const categories = Object.keys(productGroups) as ProductCategory[];

export const products: Product[] = categories.flatMap((category) =>
        productGroups[category].map(([name, price]) => ({
                id: name.toLowerCase().replace(/ /g, "-"),
                name,
                category,
                price,
                description: `Handcrafted ${name.toLowerCase()} from the workshop collection.`,
        })),
);
