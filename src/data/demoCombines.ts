// src/data/demoCombines.ts
import { jaguar1200, type ProductConfig } from "./jaguar1200";

const lexion8800: ProductConfig = {
  ...jaguar1200,
  id: "lexion-8800",
  name: "LEXION 8800 TERRA TRAC",
  subtitle: "APS SYNFLOW HYBRID",
  basePrice: 48_00_000
};

const lexion8700: ProductConfig = {
  ...jaguar1200,
  id: "lexion-8700",
  name: "LEXION 8700 TERRA TRAC",
  subtitle: "APS SYNFLOW HYBRID",
  basePrice: 46_50_000
};

const trion700: ProductConfig = {
  ...jaguar1200,
  id: "trion-700",
  family: "TRION",
  name: "TRION 700 APS HYBRID",
  subtitle: "up to stage V",
  basePrice: 38_00_000
};

const evion: ProductConfig = {
  ...jaguar1200,
  id: "evion",
  family: "EVION",
  name: "EVION",
  subtitle: "up to stage V",
  basePrice: 32_00_000
};

// 👇 You can import this array on any “demo” route later
export const demoCombines: ProductConfig[] = [
  jaguar1200,
  lexion8800,
  lexion8700,
  trion700,
  evion
];
