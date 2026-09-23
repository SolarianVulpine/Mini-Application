export type ProductCategory =
        | "Swords"
        | "Shields"
        | "Armor"
        | "Potions"
        | "Scrolls"
        | "Accessories";

export type Product = {
        id: string;
        name: string;
        category: ProductCategory;
        price: number;
        description: string;
};
