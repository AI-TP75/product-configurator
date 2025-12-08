// src/components/FamilyLanding.tsx
import type { FC } from "react";
import type { ProductFamilyInfo } from "../data/productFamilies";

interface Props {
  families: ProductFamilyInfo[];
  onSelectFamily: (familyId: string) => void;
}

export const FamilyLanding: FC<Props> = ({ families, onSelectFamily }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "48px 0 72px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      {/* Title + subtitle */}
      <header
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            fontSize: 32,          // increased from 28
            fontWeight: 600,
            marginBottom: 10,      // slightly more space
            letterSpacing: 0.02,
            color: "#111",         // darker for better contrast
          }}
        >
          The Machine Configurator
        </h1>
        <p
          style={{
            fontSize: 16,          // increased from 14
            color: "#333",         // darker, more legible
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          Build and estimate the machine that suits your farm best.
        </p>
      </header>

      {/* Grid of families – similar to CLAAS top page */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(260px, 320px))",
          gap: 40,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {families.map((family) => {
          const isEnabled = family.enabled !== false;

          const handleClick = () => {
            if (!isEnabled) return;
            onSelectFamily(family.id);
          };

          return (
            <button
              key={family.id}
              type="button"
              onClick={handleClick}
              disabled={!isEnabled}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: isEnabled ? "pointer" : "default",
                textAlign: "center",
              }}
            >
              {/* Big clean image, unified aspect ratio */}
              <div
                style={{
                  width: 320,
                  height: 200,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: 12,
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                }}
              >
                <img
                  src={family.image}
                  alt={family.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    // removed greying for disabled tiles
                    filter: "none",
                    opacity: 1,
                    transition: "transform 140ms ease, opacity 140ms ease",
                  }}
                  onMouseOver={(e) => {
                    if (!isEnabled) return;
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseOut={(e) => {
                    if (!isEnabled) return;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>

              {/* Text */}
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: 4,
                    color: "#111",
                  }}
                >
                  {family.label}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#666",
                    maxWidth: 290,
                    margin: "0 auto 6px",
                  }}
                >
                  {family.description}
                </div>

                {!isEnabled && (
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 1.2,
                      textTransform: "uppercase",
                      color: "#aaa",
                    }}
                  >
                    Coming soon
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
};
