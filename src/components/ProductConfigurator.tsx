// src/components/ProductConfigurator.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";

import type { ProductConfig } from "../data/jaguar1200";

interface Props {
  product: ProductConfig;
}

export const ProductConfigurator: FC<Props> = ({ product }) => {
  const [activeGroupId, setActiveGroupId] = useState(
    product.optionGroups[0] ? product.optionGroups[0].id : ""
  );

  // selected option per group (by id)
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const group of product.optionGroups) {
      if (group.options[0]) initial[group.id] = group.options[0].id;
    }
    return initial;
  });

  // save / share / load state
  const [savedConfigJson, setSavedConfigJson] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [loadCodeInput, setLoadCodeInput] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);

  const storageKey = "configurator_" + product.id;

  // horizontal scroll ref for the tabs row
  const tabsRef = useRef<HTMLDivElement | null>(null);

  // one DOM ref per option group so we can scroll to it (CLAAS style)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Load saved selections from localStorage on mount / when product changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;

      const parsed = JSON.parse(raw) as { selected?: Record<string, string> };
      if (!parsed || !parsed.selected) return;

      const cleaned: Record<string, string> = {};
      for (const group of product.optionGroups) {
        const optId = parsed.selected[group.id];
        if (!optId) continue;
        const exists = group.options.some(function (o) {
          return o.id === optId;
        });
        if (exists) cleaned[group.id] = optId;
      }
      if (Object.keys(cleaned).length > 0) {
        setSelected(function (prev) {
          return { ...prev, ...cleaned };
        });
      }
    } catch {
      // ignore bad data
    }
  }, [product.id, storageKey, product.optionGroups]);

  // Persist selections to localStorage whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = { selected };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // storage may be full / blocked – ignore
    }
  }, [selected, storageKey]);

  const computed = useMemo(() => {
    let price = product.basePrice;
    let image = product.imageBase;
    let optTotal = 0;

    for (const group of product.optionGroups) {
      const optionId = selected[group.id];
      const opt = group.options.find(function (o) {
        return o.id === optionId;
      });
      if (!opt) continue;

      price += opt.priceDelta;
      optTotal += opt.priceDelta;

      if (opt.imageOverrides && opt.imageOverrides.main) {
        image = opt.imageOverrides.main;
      }
    }

    return { totalPrice: price, mainImage: image, optionsTotal: optTotal };
  }, [product, selected]);

  const totalPrice = computed.totalPrice;
  const mainImage = computed.mainImage;
  const optionsTotal = computed.optionsTotal;

  const handleSelect = (groupId: string, optionId: string) => {
    setSelected(function (prev) {
      return { ...prev, [groupId]: optionId };
    });
    setSavedConfigJson(null);
    setShareCode(null);
    setLoadError(null);
  };

  // ---------- helpers for save + share code ----------

  const buildConfigObject = () => {
    return {
      productId: product.id,
      productName: product.name,
      basePrice: product.basePrice,
      totalPrice: totalPrice,
      selections: Object.entries(selected).map(function (entry) {
        const groupId = entry[0];
        const optionId = entry[1];
        const group = product.optionGroups.find(function (g) {
          return g.id === groupId;
        });
        const option = group
          ? group.options.find(function (o) {
              return o.id === optionId;
            })
          : undefined;
        return {
          groupId: groupId,
          groupLabel: group ? group.label : "",
          optionId: optionId,
          optionLabel: option ? option.label : ""
        };
      })
    };
  };

  const handleSaveConfiguration = () => {
    const obj = buildConfigObject();
    setSavedConfigJson(JSON.stringify(obj, null, 2));
    setShareCode(null);
    setLoadError(null);
  };

  const handleGenerateCode = () => {
    const obj = buildConfigObject();
    const json = JSON.stringify(obj);

    let code = "";
    try {
      code = btoa(json); // base64
    } catch {
      code = encodeURIComponent(json); // fallback
    }

    setShareCode(code);
    setSavedConfigJson(null);
    setLoadError(null);
  };

  // ---------- load from share code ----------

  const handleLoadFromCode = () => {
    setLoadError(null);
    const raw = loadCodeInput.trim();

    if (!raw) {
      setLoadError("Please paste a configuration code first.");
      return;
    }

    try {
      const clean = raw.replace(/\s+/g, "").trim();

      let json: string;
      try {
        json = atob(clean);
      } catch {
        json = decodeURIComponent(clean);
      }

      const obj = JSON.parse(json) as any;

      if (!obj || !Array.isArray(obj.selections)) {
        throw new Error("Invalid format");
      }

      if (obj.productId && obj.productId !== product.id) {
        const otherName =
          obj.productName != null ? String(obj.productName) : String(obj.productId);
        setLoadError(
          "This code belongs to another model (" +
            otherName +
            "). Switch to that model first."
        );
        return;
      }

      const newSelected: Record<string, string> = { ...selected };

      for (const sel of obj.selections) {
        const groupId = String(sel.groupId);
        const optionId = String(sel.optionId);

        const group = product.optionGroups.find(function (g) {
          return g.id === groupId;
        });
        if (!group) continue;

        const optionExists = group.options.some(function (o) {
          return o.id === optionId;
        });
        if (!optionExists) continue;

        newSelected[groupId] = optionId;
      }

      setSelected(newSelected);
      setSavedConfigJson(null);
      setShareCode(null);
    } catch {
      setLoadError(
        "Could not read this code. It may be corrupted or from another system."
      );
    }
  };

  // ---------- Create PDF summary (opens print dialog → Save as PDF) ----------

  const handleCreatePdf = () => {
    if (typeof window === "undefined") return;

    const cfg = buildConfigObject();
    const selectionsHtml = cfg.selections
      .map(function (s) {
        return (
          "<li><strong>" +
          s.groupLabel +
          "</strong>: " +
          s.optionLabel +
          "</li>"
        );
      })
      .join("");
    const priceStr = cfg.totalPrice.toLocaleString("en-IN");

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(
      "<html>" +
        "<head>" +
        "<title>Configuration – " +
        cfg.productName +
        "</title>" +
        "</head>" +
        '<body style="font-family: -apple-system, system-ui, sans-serif; padding: 24px; color: #111;">' +
        '<h1 style="margin-bottom: 4px;">' +
        cfg.productName +
        "</h1>" +
        '<p style="margin-top: 0; color: #555;">Generated configuration summary</p>' +
        '<h2 style="margin-top: 24px;">Price</h2>' +
        '<p style="font-size: 20px; font-weight: 700;">₹' +
        priceStr +
        "</p>" +
        '<h2 style="margin-top: 24px;">Selected configuration</h2>' +
        '<ul style="line-height: 1.6;">' +
        selectionsHtml +
        "</ul>" +
        '<p style="margin-top: 32px; font-size: 12px; color: #777;">' +
        "Generated on " +
        new Date().toLocaleString() +
        "</p>" +
        "<script>" +
        "window.onload = function () { window.print(); }" +
        "</script>" +
        "</body>" +
        "</html>"
    );
    win.document.close();
  };

  // ---------- tab + section scrolling helpers ----------

  const scrollTabs = (direction: "left" | "right") => {
    const node = tabsRef.current;
    if (!node) return;
    const delta = direction === "left" ? -220 : 220;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleTabClick = (groupId: string) => {
    setActiveGroupId(groupId);
    const el = sectionRefs.current[groupId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // --------------------------------------------------------

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2.5fr) minmax(320px, 1.4fr)",
        gap: 24,
        alignItems: "flex-start",
        color: "#111"
      }}
    >
      {/* LEFT: image + tabs + options */}
      <div>
        {/* Hero card */}
        <div
          style={{
            borderRadius: 20,
            background: "#ffffff",
            border: "1px solid #e4e4e4",
            boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
            padding: 20,
            marginBottom: 12,
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1.5fr) minmax(220px, 1fr)",
            gap: 16,
            alignItems: "center"
          }}
        >
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              background: "#111",
              height: 210,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src={mainImage}
              alt={product.name}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                color: "#999"
              }}
            >
              Precision planters
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600
              }}
            >
              {product.name}
            </div>

            {/* headline specs */}
            {product.headlineSpecs && (
              <div
                style={{
                  fontSize: 12,
                  color: "#666",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                {product.headlineSpecs.rows && (
                  <span>• {product.headlineSpecs.rows}</span>
                )}
                {product.headlineSpecs.spacing && (
                  <span>• {product.headlineSpecs.spacing}</span>
                )}
                {product.headlineSpecs.seedHopper && (
                  <span>• {product.headlineSpecs.seedHopper}</span>
                )}
                {product.headlineSpecs.microHopper && (
                  <span>• {product.headlineSpecs.microHopper}</span>
                )}
              </div>
            )}

            {/* price panel inside hero */}
            <div
              style={{
                marginTop: 6,
                borderRadius: 14,
                background:
                  "linear-gradient(120deg, #0b5b1e 0%, #24a54c 60%, #8fdc6d 100%)",
                padding: "10px 14px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 260
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  opacity: 0.85
                }}
              >
                Live list price (demo)
              </div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>
                ₹{totalPrice.toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: 11, opacity: 0.9, whiteSpace: "pre-wrap" }}>
                Base machine: ₹{product.basePrice.toLocaleString("en-IN")}
                {"\n"}
                Optional equipment: ₹{optionsTotal.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs with arrows */}
        <div
          style={{
            position: "relative",
            marginBottom: 10
          }}
        >
          {/* gradient masks */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 24,
              pointerEvents: "none",
              background:
                "linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(245,245,245,0) 100%)"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 24,
              pointerEvents: "none",
              background:
                "linear-gradient(270deg, rgba(245,245,245,1) 0%, rgba(245,245,245,0) 100%)"
            }}
          />

          {/* left / right buttons */}
          <button
            type="button"
            onClick={() => scrollTabs("left")}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              borderRadius: 999,
              border: "1px solid #ddd",
              width: 22,
              height: 22,
              fontSize: 12,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollTabs("right")}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              borderRadius: 999,
              border: "1px solid #ddd",
              width: 22,
              height: 22,
              fontSize: 12,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            ›
          </button>

          <div
            ref={tabsRef}
            style={{
              overflowX: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              padding: "0 32px",
              display: "flex",
              gap: 18,
              borderBottom: "1px solid #e0e0e0"
            }}
          >
            {product.optionGroups.map((group) => {
              const isActive = group.id === activeGroupId;
              return (
                <button
                  key={group.id}
                  onClick={() => handleTabClick(group.id)}
                  style={{
                    padding: "10px 0",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontSize: 13,
                    color: isActive ? "#0b5b1e" : "#777",
                    borderBottom: isActive
                      ? "2px solid #0b5b1e"
                      : "2px solid transparent",
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CLAAS-style stacked sections: all option groups */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingBottom: 32
          }}
        >
          {product.optionGroups.map((group) => (
            <div
              key={group.id}
              ref={(el) => {
                sectionRefs.current[group.id] = el;
              }}
              style={{
                borderRadius: 16,
                background: "#ffffff",
                boxShadow:
                  activeGroupId === group.id
                    ? "0 12px 26px rgba(0,0,0,0.06)"
                    : "0 6px 18px rgba(0,0,0,0.03)",
                border:
                  activeGroupId === group.id
                    ? "1px solid rgba(11,91,30,0.4)"
                    : "1px solid #e3e3e3",
                overflow: "hidden"
              }}
            >
              {/* Group header */}
              <div
                style={{
                  padding: "8px 14px",
                  borderBottom: "1px solid #e9e9e9",
                  fontSize: 13,
                  fontWeight: 600,
                  background:
                    activeGroupId === group.id ? "#f3fbf4" : "#fafafa"
                }}
              >
                {group.label}
              </div>

              {/* Options list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: 10
                }}
              >
                {group.options.map((opt) => {
                  const isSelected = selected[group.id] === opt.id;

                  const thumbnail =
                    opt.imageOverrides && opt.imageOverrides.main
                      ? opt.imageOverrides.main
                      : product.imageBase;

                  const isStandard = opt.priceDelta === 0;

                  const priceText = isStandard
                    ? "Included"
                    : opt.priceDelta > 0
                    ? "₹" + opt.priceDelta.toLocaleString("en-IN")
                    : "₹" + opt.priceDelta.toLocaleString("en-IN");

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(group.id, opt.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: 14,
                        cursor: "pointer",
                        fontSize: 13,
                        textAlign: "left",
                        background: isSelected ? "#e7f6e9" : "#ffffff",
                        border: isSelected
                          ? "1px solid #4caf50"
                          : "1px solid #e3e3e3",
                        boxShadow: isSelected
                          ? "0 10px 22px rgba(76,175,80,0.22)"
                          : "0 4px 12px rgba(0,0,0,0.03)",
                        transition:
                          "background 120ms ease, box-shadow 120ms ease, border 120ms ease"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          flex: 1
                        }}
                      >
                        <div
                          style={{
                            width: 72,
                            height: 48,
                            borderRadius: 10,
                            overflow: "hidden",
                            background: "#f3f3f3",
                            border: "1px solid #e0e0e0",
                            flexShrink: 0
                          }}
                        >
                          <img
                            src={thumbnail}
                            alt={opt.label}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column"
                          }}
                        >
                          <span style={{ fontSize: 13, fontWeight: 500 }}>
                            {opt.label}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: "#888",
                              marginTop: 2
                            }}
                          >
                            Configures the {group.label.toLowerCase()}.
                          </span>
                          {isStandard && (
                            <span
                              style={{
                                marginTop: 6,
                                alignSelf: "flex-start",
                                fontSize: 10,
                                padding: "2px 8px",
                                borderRadius: 999,
                                background: "#e1f8ea",
                                color: "#2e7d32",
                                border: "1px solid #a5d6a7"
                              }}
                            >
                              Standard
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: isStandard ? "#999" : "#111",
                          marginLeft: 12,
                          flexShrink: 0
                        }}
                      >
                        {priceText}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: summary / price / actions */}
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14
        }}
      >
        {/* Price / summary card */}
        <div
          style={{
            borderRadius: 20,
            padding: 16,
            background: "#ffffff",
            border: "1px solid #e4e4e4",
            boxShadow: "0 14px 35px rgba(0,0,0,0.08)"
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.3,
              color: "#999",
              marginBottom: 6
            }}
          >
            Configuration summary
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <div
              style={{
                width: 60,
                height: 40,
                borderRadius: 8,
                overflow: "hidden",
                background: "#f0f0f0",
                border: "1px solid #e2e2e2",
                flexShrink: 0
              }}
            >
              <img
                src={mainImage}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>
                {product.name}
              </span>
              <span style={{ fontSize: 11, color: "#999" }}>
                Demo configuration
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#666",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              rowGap: 2
            }}
          >
            <span>Base machine</span>
            <span>₹{product.basePrice.toLocaleString("en-IN")}</span>
            <span>Optional equipment</span>
            <span>₹{optionsTotal.toLocaleString("en-IN")}</span>
            <span style={{ fontWeight: 600, marginTop: 4 }}>
              Total list price
            </span>
            <span
              style={{
                fontWeight: 700,
                marginTop: 4,
                color: "#0b5b1e"
              }}
            >
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}
          >
            <button
              onClick={handleSaveConfiguration}
              style={{
                borderRadius: 999,
                border: "none",
                padding: "8px 14px",
                background:
                  "linear-gradient(120deg, #1b8a2f 0%, #35c34d 100%)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Save configuration
            </button>
            <button
              onClick={handleGenerateCode}
              style={{
                borderRadius: 999,
                border: "1px solid #d0d0d0",
                padding: "8px 14px",
                background: "#ffffff",
                color: "#222",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Generate code
            </button>
            <button
              onClick={handleCreatePdf}
              style={{
                borderRadius: 999,
                border: "1px solid #d0d0d0",
                padding: "8px 14px",
                background: "#ffffff",
                color: "#222",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Create PDF
            </button>
          </div>
        </div>

        {/* Selected configuration */}
        {/* Selected configuration */}
        <div
          style={{
            borderRadius: 18,
            padding: 16,
            background: "#ffffff",
            border: "1px solid #e4e4e4",
            // no maxHeight, no overflow → everything visible
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8
            }}
          >
            Selected configuration
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: 12,
              lineHeight: 1.7
            }}
          >
            {product.optionGroups.map((group) => {
              const optId = selected[group.id];
              const opt = group.options.find(function (o) {
                return o.id === optId;
              });
              if (!opt) return null;
              return (
                <li
                  key={group.id}
                  style={{
                    marginBottom: 6,
                    display: "flex",
                    gap: 6
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#444",
                      minWidth: 130
                    }}
                  >
                    {group.label}:
                  </span>
                  <span style={{ color: "#111" }}>{opt.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Load from code */}
        {/* Load from code */}
        <div
          style={{
            borderRadius: 18,
            padding: 16,
            background: "#ffffff",
            border: "1px solid #e4e4e4",
            fontSize: 12
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Load configuration from code
          </div>
          <textarea
            value={loadCodeInput}
            onChange={(e) => setLoadCodeInput(e.target.value)}
            rows={3}
            placeholder="Paste a configuration code here…"
            style={{
              width: "100%",
              resize: "vertical",
              borderRadius: 8,
              padding: 8,
              fontFamily: "monospace",
              fontSize: 11,
              marginBottom: 8,
              backgroundColor: "#ffffff",
              color: "#111111",
              border: "1px solid #d0d0d0",
              outline: "none",
              boxShadow: "none"
            }}
          />
          <button
            onClick={handleLoadFromCode}
            style={{
              borderRadius: 999,
              border: "1px solid #d0d0d0",
              padding: "6px 10px",
              background: "#ffffff",
              color: "#222",
              cursor: "pointer",
              textAlign: "center",
              width: "100%",
              fontSize: 12,
              fontWeight: 500
            }}
          >
            Load from code
          </button>
          {loadError && (
            <div
              style={{
                marginTop: 6,
                color: "#c62828",
                fontSize: 11
              }}
            >
              {loadError}
            </div>
          )}
        </div>

        {/* Saved JSON / share code display */}
        {(savedConfigJson || shareCode) && (
          <div
            style={{
              borderRadius: 16,
              padding: 12,
              background: "#ffffff",
              border: "1px solid #e4e4e4",
              fontSize: 11
            }}
          >
            {savedConfigJson && (
              <>
                <div
                  style={{ fontWeight: 600, marginBottom: 4 }}
                >
                  Saved configuration (JSON)
                </div>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    color: "#333"
                  }}
                >
                  {savedConfigJson}
                </pre>
              </>
            )}

            {shareCode && (
              <>
                <div
                  style={{ fontWeight: 600, marginBottom: 4 }}
                >
                  Share code
                </div>
                <div
                  style={{
                    wordBreak: "break-all",
                    color: "#333"
                  }}
                >
                  {shareCode}
                </div>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
