// src/data/productFamilies.ts

// We keep the `id` exactly equal to ProductConfig.family
// so we can filter products by `family` later without any mapping.

export interface ProductFamilyInfo {
  id: string;          // must match ProductConfig.family
  label: string;       // UI label
  description: string;
  image: string;       // path to the hero image
  enabled?: boolean;   // if false => "Coming soon"
}

export const productFamilies: ProductFamilyInfo[] = [
  {
    id: "Precision Planters",
    label: "Precision planters",
    description: "TV 300 range and other high-precision row planters.",
    image: "/images/families/precision-planters.png",
    enabled: true
  },
  {
    id: "Front Hopper",
    label: "Front hoppers",
    description: "Fertiliser and microgranular front hopper solutions.",
    image: "/images/families/front-hopper.png",
    enabled: false
  },
  {
    id: "Seed Drills",
    label: "Seed drills",
    description: "High-output seed drills for cereals and oilseeds.",
    image: "/images/families/seed-drills.png",
    enabled: false
  },
  {
    id: "Spreaders",
    label: "Spreaders",
    description: "Fertiliser spreaders for precise application.",
    image: "/images/families/spreaders.png",
    enabled: false
  }
];
