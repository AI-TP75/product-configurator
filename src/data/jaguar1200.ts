// src/data/jaguar1200.ts
// Product type definitions (simple version for MVP)

export interface Option {
  id: string;
  label: string;
  priceDelta: number;
  imageOverrides?: { main?: string };
}

export interface OptionGroup {
  id: string;
  label: string;
  selectionMode: "single" | "multi";
  options: Option[];
}

// Generic headline spec type – used for CLAAS-style header chips
// and for different product families (precision planters, drills, spreaders).
export interface HeadlineSpecs {
  rows?: string;        // e.g. "6 rows"
  spacing?: string;     // e.g. "45–75 cm"
  seedHopper?: string;  // e.g. "70 L seed hopper"
  microHopper?: string; // e.g. "20 L micro hopper"
}

// Main product config type used everywhere
export interface ProductConfig {
  id: string;
  family: string;
  name: string;
  subtitle?: string;

  // Optional: used for CLAAS-style header + small spec line on cards
  headlineSpecs?: HeadlineSpecs;

  // Optional: key for looking up the technical spec table
  // (we start with "tv300", can widen later)
  specTableKey?: "tv300";

  basePrice: number;
  imageBase: string;
  optionGroups: OptionGroup[];
}

// Sample product — you can tweak labels/prices later
export const jaguar1200: ProductConfig = {
  id: "lexion-8900",
  family: "LEXION",
  name: "LEXION 8900 TERRA TRAC",
  subtitle: "APS SYNFLOW HYBRID up to stage V",
  basePrice: 50_00_000,
  imageBase: "/images/jaguar/base.png",
  optionGroups: [
    {
      id: "front-attachment",
      label: "Front Attachment Drive & Intake",
      selectionMode: "single",
      options: [
        {
          id: "front-m-fixed",
          label: "Front attachment drive M, fixed speed",
          priceDelta: 0,
          imageOverrides: { main: "/images/jaguar/base.png" }
        },
        {
          id: "front-xl-2speed",
          label: "Front attachment drive XL, two-speed",
          priceDelta: 40_000,
          imageOverrides: { main: "/images/jaguar/orbis-9000.png" }
        },
        {
          id: "front-xl-variable",
          label: "Front attachment drive XL, variable",
          priceDelta: 70_000,
          imageOverrides: { main: "/images/jaguar/orbis-10500.png" }
        }
      ]
    },
    {
      id: "separation-cleaning",
      label: "Separation & Cleaning",
      selectionMode: "single",
      options: [
        { id: "standard-rotor", label: "Standard rotor system", priceDelta: 0 },
        {
          id: "intensive-rotor",
          label: "Intensive rotor system",
          priceDelta: 90_000
        },
        {
          id: "premium-rotor",
          label: "Premium rotor with auto-clean",
          priceDelta: 1_40_000
        }
      ]
    },
    {
      id: "grain-tank",
      label: "Grain Tank & Unloading Auger",
      selectionMode: "single",
      options: [
        { id: "grain-13500", label: "13,500 L grain tank", priceDelta: 0 },
        {
          id: "grain-15000",
          label: "15,000 L grain tank",
          priceDelta: 1_10_000
        },
        {
          id: "grain-18000",
          label: "18,000 L grain tank",
          priceDelta: 1_90_000
        }
      ]
    },
    {
      id: "straw-management",
      label: "Straw Management",
      selectionMode: "single",
      options: [
        { id: "chopper-standard", label: "Standard chopper", priceDelta: 0 },
        {
          id: "chopper-premium",
          label: "Premium chopper with spreader",
          priceDelta: 60_000
        }
      ]
    }
  ]
};
