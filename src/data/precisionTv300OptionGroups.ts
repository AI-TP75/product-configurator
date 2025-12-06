// src/data/precisionTv300OptionGroups.ts
import type { OptionGroup } from "./jaguar1200";

const baseThumb = "/images/jaguar/base.png";

export const precisionTv300OptionGroups: OptionGroup[] = [
  // 1. Frame & drives
  {
    id: "frame-drives",
    label: "Frame & drives",
    options: [
      {
        id: "frame-hydraulic-turbine",
        label: "Hydraulic turbine",
        priceDelta: 9002,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "frame-pto-drive",
        label: "PTO drive with heavy-duty gearbox",
        priceDelta: 14500,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "frame-electro-fold",
        label: "Electro-hydraulic frame fold",
        priceDelta: 18800,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "frame-iso-bus",
        label: "ISOBUS terminal with headland management",
        priceDelta: 22400,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "frame-hopper-platform",
        label: "Frame platform with access steps",
        priceDelta: 7800,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 2. Row units & downforce
  {
    id: "row-units-downforce",
    label: "Row units & downforce",
    options: [
      {
        id: "downforce-mech-standard",
        label: "Mechanical downforce – standard springs",
        priceDelta: 0,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "downforce-mech-heavy",
        label: "Mechanical downforce – heavy-duty springs",
        priceDelta: 11000,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "downforce-hyd-basic",
        label: "Hydraulic downforce – basic",
        priceDelta: 28500,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "downforce-hyd-active",
        label: "Hydraulic downforce – active with sensors",
        priceDelta: 41200,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 3. Depth control wheels
  {
    id: "depth-control-wheels",
    label: "Depth control wheels",
    options: [
      {
        id: "depth-narrow-400-65",
        label: "Narrow depth control wheels 400×65 ribbed tyre (1/row)",
        priceDelta: 0,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "depth-wide-420-65",
        label: "Wide depth control wheels 420×65 ribbed tyre (1/row)",
        priceDelta: 15400,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "depth-cast-press",
        label: "Cast depth control wheels with press profile (1/row)",
        priceDelta: 18600,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "depth-double-wheel",
        label: "Double depth control wheels (2× 320×65 per row)",
        priceDelta: 22450,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 4. Closing wheels (long CLAAS-style list)
  {
    id: "closing-wheels",
    label: "Closing wheels",
    options: [
      {
        id: "closing-dual-2in-standard",
        label: "Dual closing wheels 2\" (1/row)",
        priceDelta: 0,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "closing-dual-2in-notched",
        label: "Dual closing wheels 2\" notched (1/row)",
        priceDelta: 12900,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "closing-dual-2in-spoked",
        label: "Dual closing wheels 2\" spoked (1/row)",
        priceDelta: 23400,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "closing-trapezoid-cast",
        label: "Dual trapezoid cast closing wheels (1/row)",
        priceDelta: 23400,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "closing-dual-toothed",
        label: "Dual toothed closing wheels 2\" (1/row)",
        priceDelta: 33500,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "closing-offset-1in",
        label: "Dual closing wheel offset 1\" (1/row)",
        priceDelta: 13000,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "closing-offset-2in",
        label: "Dual closing wheel offset 2\" (1/row)",
        priceDelta: 19900,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "closing-lightweight-25mm",
        label:
          "Dual lightweight 25 mm toothed cast iron closing wheel (1/row)",
        priceDelta: 23000,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 5. Row cleaners / extras
  {
    id: "row-cleaners-extras",
    label: "Row cleaners / extras",
    options: [
      {
        id: "row-cleaner-floating",
        label: "Floating row cleaners with depth bands",
        priceDelta: 27600,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "row-cleaner-fixed",
        label: "Fixed row cleaners with finger wheels",
        priceDelta: 19800,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "row-cleaner-trash-wheels",
        label: "Trash wheels with spring adjustment",
        priceDelta: 22400,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "extras-gauge-wheels",
        label: "Extra gauge wheel scrapers (set)",
        priceDelta: 5600,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 6. Seed hopper / discharge
  {
    id: "seed-hopper-discharge",
    label: "Seed hopper / discharge",
    options: [
      {
        id: "seed-70l-standard",
        label: "Seed hopper 70 L (standard)",
        priceDelta: 0,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "seed-90l-large",
        label: "Seed hopper 90 L (large)",
        priceDelta: 16800,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "seed-quick-discharge",
        label: "Seed hopper quick discharge kit (1/row)",
        priceDelta: 8700,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 7. Front hopper & hydraulics
  {
    id: "front-hopper-hydraulics",
    label: "Front hopper & hydraulics",
    options: [
      {
        id: "front-hopper-1200l",
        label: "Front hopper 1200 L with metering",
        priceDelta: 145000,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "front-hopper-weight-transfer",
        label: "Hydraulic tractor weight transfer kit",
        priceDelta: 31200,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "front-hopper-iso-bus",
        label: "ISOBUS control for front hopper",
        priceDelta: 26400,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 8. Fertiliser system
  {
    id: "fertiliser-system",
    label: "Fertiliser system",
    options: [
      {
        id: "fert-basic-800l",
        label: "Fertiliser hopper 800 L, basic",
        priceDelta: 0,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "fert-1400l",
        label: "Fertiliser hopper 1400 L",
        priceDelta: 92500,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "fert-section-control",
        label: "Section control for fertiliser metering",
        priceDelta: 38700,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 9. Microgranular
  {
    id: "microgranular",
    label: "Microgranular",
    options: [
      {
        id: "micro-front-hopper",
        label: "Front hopper microgranular AURA-T motor from planter ECU",
        priceDelta: 64500,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "micro-local-rows",
        label: "Microgranular hopper on every 2nd row",
        priceDelta: 51800,
        imageOverrides: { main: baseThumb }
      }
    ]
  },

  // 10. Row markers
  {
    id: "row-markers",
    label: "Row markers",
    options: [
      {
        id: "row-markers-hydraulic",
        label: "Hydraulic row markers",
        priceDelta: 20450,
        imageOverrides: { main: baseThumb }
      },
      {
        id: "row-markers-mech",
        label: "Mechanical row markers",
        priceDelta: 0,
        imageOverrides: { main: baseThumb }
      }
    ]
  }
];
