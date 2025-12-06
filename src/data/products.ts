// src/data/products.ts
import type { ProductConfig } from "./jaguar1200";
import {
  tv300_6_45_75,
  tv300_6_50_80,
  tv300_7,
  tv300_7s
} from "./precisionTv300";

// Main catalog products (for the CLAAS-style flow)
export const products: ProductConfig[] = [
  tv300_6_45_75,
  tv300_6_50_80,
  tv300_7,
  tv300_7s
];

export const getProductById = (id: string): ProductConfig | undefined =>
  products.find((p) => p.id === id);

// Optional: re-export demo combines so you can import them elsewhere if needed
export { demoCombines } from "./demoCombines";
