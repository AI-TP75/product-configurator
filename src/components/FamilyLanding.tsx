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
        background: "#f5f5f5"
      }}
    >
      {/* Title + subtitle */}
      <header
        style={{
          textAlign: "center",
          marginBottom: 40
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 8,
            letterSpacing: 0.02
          }}
        >
          The Machine Configurator
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#555",
            maxWidth: 520,
            margin: "0 auto"
          }}
        >
          Build and price a machine that is the right fit for your farm.
        </p>
      </header>

      {/* Grid of families – similar to CLAAS top page */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(260px, 320px))",
          gap: 40,
          alignItems: "flex-start",
          justifyContent: "center"
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
                textAlign: "center"
              }}
            >
              {/* Big clean image, no card border */}
              <div
                style={{
                  width: 320,
                  height: 200,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                
                <img
                    src={family.image}
                    alt={family.label}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        // always colour – no grayscale
                        filter: "none",
                        // dim only if disabled
                        opacity: isEnabled ? 1 : 0.55,
                        // default position
                        transform: "translateY(0)",
                        // 🔥 single transition property
                        transition: "transform 140ms ease, opacity 140ms ease"
                    }}
                    onMouseOver={(e) => {
                        if (!isEnabled) return;
                        e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseOut={(e) => {
                        if (!isEnabled) return;
                        e.currentTarget.style.transform = "translateY(0)";
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
                    color: "#111"
                  }}
                >
                  {family.label}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#666",
                    maxWidth: 290,
                    margin: "0 auto 6px"
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
                      color: "#aaa"
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
