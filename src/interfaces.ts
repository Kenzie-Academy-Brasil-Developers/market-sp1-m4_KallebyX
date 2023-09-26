export interface product {
    id: number;
    name: string;
    price: number;
    weight: number;
    section: "food" | null;
    calories?: number | null;
    expirationDate: Date;
}