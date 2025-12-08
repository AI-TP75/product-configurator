// src/components/ProductFamilyOverview.tsx
import type { FC } from "react";
import type { ProductConfig } from "../data/jaguar1200";

interface Props {
  products: ProductConfig[];
  onSelectProduct: (id: string) => void;
}

// simple helper to format EUR with symbol BEFORE the amount, e.g. "€ 31.706"
const formatEuro = (amount: number) =>
  `€ ${amount.toLocaleString("de-DE", {
    maximumFractionDigits: 0,
  })}`;

/**
 * Step 2: choose a model within the selected family.
 */
export const ProductFamilyOverview: FC<Props> = ({
  products,
  onSelectProduct,
}) => {
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          padding: "48px 0",
          textAlign: "center",
          color: "#666",
          fontSize: 14,
        }}
      >
        No models available in this family yet.
      </div>
    );
  }

  const familyName = products[0].family;

  return (
    <div>
      {/* Page heading */}
      <header
        style={{
          marginBottom: 24,
          borderBottom: "1px solid #e5e5e5",
          paddingBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "#999",
            marginBottom: 4,
          }}
        >
          {familyName}
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 600,
            margin: 0,
            color: "#111",
          }}
        >
          Select a model
        </h1>
        <p
          style={{
            marginTop: 6,
            marginBottom: 0,
            fontSize: 13,
            color: "#666",
          }}
        >
          Choose the machine that matches your rows, spacing and hopper
          requirements.
        </p>
      </header>

      {/* Model rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {products.map((p) => {
          const hs: any = p.headlineSpecs || {};
          const rows =
            hs.rows ??
            (typeof hs.rows === "number" ? `${hs.rows} rows` : undefined);
          const spacing = hs.rowSpacing || hs.spacing;
          const seedHopper =
            hs.seedHopper ||
            (hs.seedHopperL ? `${hs.seedHopperL} L seed hopper` : null);
          const microHopper =
            hs.microHopper ||
            (hs.microHopperL ? `${hs.microHopperL} L micro hopper` : null);

          return (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(260px, 340px) 1fr auto",
                columnGap: 24,
                rowGap: 12,
                alignItems: "center",
                padding: "18px 8px",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* Image */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 260,
                    height: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={p.imageBase}
                    alt={p.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>

              {/* Text block */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#111",
                  }}
                >
                  {p.name}
                </div>
                {p.subtitle && (
                  <div
                    style={{
                      fontSize: 12,
                      color: "#777",
                      marginBottom: 2,
                    }}
                  >
                    {p.subtitle}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    fontSize: 12,
                    color: "#555",
                  }}
                >
                  {rows && <span>{rows}</span>}
                  {spacing && <span>{spacing}</span>}
                  {seedHopper && <span>{seedHopper}</span>}
                  {microHopper && <span>{microHopper}</span>}
                </div>
              </div>

              {/* CTA */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#555",
                    fontWeight: 500, // slightly stronger so price reads clearly
                  }}
                >
                  From {formatEuro(p.basePrice)}
                </div>
                <button
                  type="button"
                  onClick={() => onSelectProduct(p.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    border: "none",
                    background: "#77b91d",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
                  }}
                >
                  Configure
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
