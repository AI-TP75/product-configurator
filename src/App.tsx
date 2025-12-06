// src/App.tsx
import React, { useMemo, useState } from "react";
import { products, getProductById } from "./data/products";
import { productFamilies } from "./data/productFamilies";
import { FamilyLanding } from "./components/FamilyLanding";
import { ProductFamilyOverview } from "./components/ProductFamilyOverview";
import { ProductConfigurator } from "./components/ProductConfigurator";
import type { ProductConfig } from "./data/jaguar1200";

type Step = "family" | "model" | "config";

export const App: React.FC = () => {
  const [step, setStep] = useState<Step>("family");
  const [activeFamilyId, setActiveFamilyId] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const activeProduct: ProductConfig | undefined = useMemo(
    () => (activeProductId ? getProductById(activeProductId) : undefined),
    [activeProductId]
  );

  const familyProducts: ProductConfig[] = useMemo(() => {
    if (!activeFamilyId) return [];
    return products.filter((p) => p.family === activeFamilyId);
  }, [activeFamilyId]);

  const handleSelectFamily = (familyId: string) => {
    setActiveFamilyId(familyId);
    setActiveProductId(null);
    setStep("model");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProduct = (productId: string) => {
    setActiveProductId(productId);
    setStep("config");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToFamilies = () => {
    setStep("family");
    setActiveFamilyId(null);
    setActiveProductId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToModels = () => {
    setStep("model");
    setActiveProductId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Step 1: family landing (CLAAS-style top page) ----------

  if (step === "family") {
    return (
      <FamilyLanding
        families={productFamilies}
        onSelectFamily={handleSelectFamily}
      />
    );
  }

  // ---------- Step 2: model list within a family ----------

  if (step === "model") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          color: "#111",
          padding: "32px 24px"
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto"
          }}
        >
          {/* Simple header with back + step indicator */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24
            }}
          >
            <button
              onClick={handleBackToFamilies}
              style={{
                borderRadius: 999,
                padding: "6px 14px",
                border: "1px solid #ddd",
                background: "#fff",
                color: "#333",
                cursor: "pointer",
                fontSize: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)"
              }}
            >
              ← All machine categories
            </button>
            <div style={{ fontSize: 13, color: "#777" }}>
              Step 2 of 3 · Choose a model
            </div>
          </header>

          <ProductFamilyOverview
            products={familyProducts}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      </div>
    );
  }

  // ---------- Step 3: configuration ----------

  if (!activeProduct) {
    // Safety fallback – if product missing, go back to models
    setStep("model");
    return null;
  }

  // step === "config"
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f7",    // 🔵 was #050505
        color: "#111",            // 🔵 was #f5f5f5
        padding: "24px 24px 40px 24px"
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Header with back links */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleBackToFamilies}
              style={{
                borderRadius: 999,
                padding: "6px 14px",
                border: "1px solid #ddd",
                background: "#fff",
                color: "#333",
                cursor: "pointer",
                fontSize: 12
              }}
            >
              ← All machine categories
            </button>
            <button
              onClick={handleBackToModels}
              style={{
                borderRadius: 999,
                padding: "6px 14px",
                border: "1px solid #ddd",
                background: "#fff",
                color: "#333",
                cursor: "pointer",
                fontSize: 12
              }}
            >
              ← Back to models
            </button>
          </div>
          <div style={{ fontSize: 13, color: "#777" }}>
            Step 3 of 3 · Configure your machine
          </div>
        </header>

        <ProductConfigurator product={activeProduct} />
      </div>
    </div>
  );
};

export default App;
