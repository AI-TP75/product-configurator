// src/data/precisionTv300.ts
import { jaguar1200, type ProductConfig } from "./jaguar1200";
import { tv300HeadlineSpecs } from "./precisionTv300Specs";

/**
 * TV 300 precision planters.
 *
 * We reuse jaguar1200 as a visual/template base and override:
 * - id, name, subtitle, basePrice
 * - family ("Precision Planters")
 * - optionGroups
 *
 * All prices below are taken from the TV 300 price sheet.
 * Currency = EUR list price (the UI currently displays "₹", but these
 * numbers are still raw Euro values – no conversion applied yet).
 */

type ModelKey = "tv300_6_45_75" | "tv300_6_50_80" | "tv300_7" | "tv300_7s";

interface OptionPricePerModel {
  tv300_6_45_75: number;
  tv300_6_50_80: number;
  tv300_7: number;
  tv300_7s: number;
}

interface PrecisionOptionDef {
  id: string;
  section: string; // PDF section number (1–12)
  groupLabel: string; // UI group/tab label
  label: string; // User-facing option label
  ref: string; // Ref. codes from sheet (for future display if needed)
  prices: OptionPricePerModel;
}

/**
 * Master table – each row maps directly to the PDF price list.
 * One place to maintain prices for all 4 models.
 */
const PRECISION_OPTION_TABLE: PrecisionOptionDef[] = [
  // 1. Base machine
  {
    id: "base-machine",
    section: "1",
    groupLabel: "Base machine",
    label:
      "Base machine (telescopic frame for single disc fertiliser openers)",
    ref: "EO-271917 / 918 / 922 / 923",
    prices: {
      tv300_6_45_75: 31706,
      tv300_6_50_80: 31840,
      tv300_7: 33750,
      tv300_7s: 34397
    }
  },

  // 2. Hydraulic turbine (frame & drives)
  {
    id: "hydraulic-turbine",
    section: "2",
    groupLabel: "Frame & drives",
    label: "Hydraulic turbine",
    ref: "EO-041905",
    prices: {
      tv300_6_45_75: 9002,
      tv300_6_50_80: 9002,
      tv300_7: 9002,
      tv300_7s: 9002
    }
  },

  // 3–4. Row units & downforce (hydraulic vs mechanical)
  {
    id: "row-units-hydraulic-downforce",
    section: "3",
    groupLabel: "Row units & downforce",
    label: "Row units with hydraulic downforce (1/row)",
    ref: "EO-101986 / 101947",
    prices: {
      tv300_6_45_75: 2572,
      tv300_6_50_80: 2572,
      tv300_7: 2819,
      tv300_7s: 2819
    }
  },
  {
    id: "row-units-mechanical-downforce",
    section: "3",
    groupLabel: "Row units & downforce",
    label: "Row units with mechanical downforce (1/row)",
    ref: "EO-051936 / 051911",
    prices: {
      tv300_6_45_75: 664,
      tv300_6_50_80: 664,
      tv300_7: 771,
      tv300_7s: 771
    }
  },

  // 5–7. Depth control wheels
  {
    id: "depth-wheel-ribbed",
    section: "5",
    groupLabel: "Depth control wheels",
    label: "Narrow depth control wheels 400×65 ribbed tyre (1/row)",
    ref: "EO-051920",
    prices: {
      tv300_6_45_75: 379,
      tv300_6_50_80: 379,
      tv300_7: 379,
      tv300_7s: 379
    }
  },
  {
    id: "depth-wheel-spoked",
    section: "5",
    groupLabel: "Depth control wheels",
    label: "Narrow depth control wheels 400×65 with spoked rims (1/row)",
    ref: "EO-051921",
    prices: {
      tv300_6_45_75: 424,
      tv300_6_50_80: 424,
      tv300_7: 424,
      tv300_7s: 424
    }
  },
  {
    id: "depth-wheel-closed",
    section: "5",
    groupLabel: "Depth control wheels",
    label: "Narrow depth control wheels 400×65 with closed rims (1/row)",
    ref: "EO-051920",
    prices: {
      tv300_6_45_75: 379,
      tv300_6_50_80: 379,
      tv300_7: 379,
      tv300_7s: 379
    }
  },

  // 8–16. Closing wheels
  {
    id: "closing-2in-standard",
    section: "6",
    groupLabel: "Closing wheels",
    label: 'Dual closing wheels 2" (1/row)',
    ref: "EO-051902",
    prices: {
      tv300_6_45_75: 129,
      tv300_6_50_80: 129,
      tv300_7: 129,
      tv300_7s: 129
    }
  },
  {
    id: "closing-2in-notched",
    section: "6",
    groupLabel: "Closing wheels",
    label: 'Dual closing wheels 2" notched (1/row)',
    ref: "EO-051904",
    prices: {
      tv300_6_45_75: 99,
      tv300_6_50_80: 99,
      tv300_7: 99,
      tv300_7s: 99
    }
  },
  {
    id: "closing-2in-spoked",
    section: "6",
    groupLabel: "Closing wheels",
    label: 'Dual closing wheels 2" spoked (1/row)',
    ref: "EO-051906",
    prices: {
      tv300_6_45_75: 234,
      tv300_6_50_80: 234,
      tv300_7: 234,
      tv300_7s: 234
    }
  },
  {
    id: "closing-trapezoidal-cast",
    section: "6",
    groupLabel: "Closing wheels",
    label: "Dual trapezoidal cast closing wheels (1/row)",
    ref: "EO-051906",
    prices: {
      tv300_6_45_75: 234,
      tv300_6_50_80: 234,
      tv300_7: 234,
      tv300_7s: 234
    }
  },
  {
    id: "closing-2in-toothed",
    section: "6",
    groupLabel: "Closing wheels",
    label: 'Dual toothed closing wheels 2" (1/row)',
    ref: "EO-051908",
    prices: {
      tv300_6_45_75: 335,
      tv300_6_50_80: 335,
      tv300_7: 335,
      tv300_7s: 335
    }
  },
  {
    id: "closing-offset-1in",
    section: "6",
    groupLabel: "Closing wheels",
    label: 'Dual closing wheel offset 1" (1/row)',
    ref: "EO-051903",
    prices: {
      tv300_6_45_75: 130,
      tv300_6_50_80: 130,
      tv300_7: 130,
      tv300_7s: 130
    }
  },
  {
    id: "closing-offset-2in",
    section: "6",
    groupLabel: "Closing wheels",
    label: 'Dual closing wheel offset 2" (1/row)',
    ref: "EO-051905",
    prices: {
      tv300_6_45_75: 99,
      tv300_6_50_80: 99,
      tv300_7: 99,
      tv300_7s: 99
    }
  },
  {
    id: "closing-toothed-cast-25mm",
    section: "6",
    groupLabel: "Closing wheels",
    label:
      "Dual lightweight 25 mm toothed cast iron closing wheel (1/row)",
    ref: "EO-051907",
    prices: {
      tv300_6_45_75: 230,
      tv300_6_50_80: 230,
      tv300_7: 230,
      tv300_7s: 230
    }
  },
  {
    id: "closing-rubber-offset",
    section: "6",
    groupLabel: "Closing wheels",
    label: "Dual rubber offset closing wheel (1/row)",
    ref: "EO-051909",
    prices: {
      tv300_6_45_75: 330,
      tv300_6_50_80: 330,
      tv300_7: 330,
      tv300_7s: 330
    }
  },

  // 17–26. Row cleaners / extras
  {
    id: "clod-removers",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Clod removers (1/row)",
    ref: "EO-051911",
    prices: {
      tv300_6_45_75: 111,
      tv300_6_50_80: 111,
      tv300_7: 111,
      tv300_7s: 111
    }
  },
  {
    id: "residue-row-cleaners",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Residue row cleaners with parallelogram (1/row)",
    ref: "EO-051910",
    prices: {
      tv300_6_45_75: 552,
      tv300_6_50_80: 552,
      tv300_7: 552,
      tv300_7s: 552
    }
  },
  {
    id: "air-tube-3d",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "3D air tube (disc + residue row cleaner) (1/row)",
    ref: "EO-051901",
    prices: {
      tv300_6_45_75: 861,
      tv300_6_50_80: 861,
      tv300_7: 861,
      tv300_7s: 861
    }
  },
  {
    id: "intermediaries-wheel-steel",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Stainless steel intermediary wheel (1/row)",
    ref: "EO-051913",
    prices: {
      tv300_6_45_75: 379,
      tv300_6_50_80: 379,
      tv300_7: 379,
      tv300_7s: 379
    }
  },
  {
    id: "intermediaries-wheel-rubber",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Rubber intermediary wheel (1/row)",
    ref: "EO-051937",
    prices: {
      tv300_6_45_75: 204,
      tv300_6_50_80: 204,
      tv300_7: 204,
      tv300_7s: 204
    }
  },
  {
    id: "keeton",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Keeton (1/row)",
    ref: "EO-051938",
    prices: {
      tv300_6_45_75: 173,
      tv300_6_50_80: 173,
      tv300_7: 173,
      tv300_7s: 173
    }
  },
  {
    id: "keeton-sticky",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Keeton for sticky soils (1/row)",
    ref: "EO-051939",
    prices: {
      tv300_6_45_75: 248,
      tv300_6_50_80: 248,
      tv300_7: 248,
      tv300_7s: 248
    }
  },
  {
    id: "open-furrow-hydraulic",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Open furrow (hydraulically pressurised) (1/row)",
    ref: "EO-051935",
    prices: {
      tv300_6_45_75: 81,
      tv300_6_50_80: 81,
      tv300_7: 81,
      tv300_7s: 81
    }
  },
  {
    id: "open-rim-rubber",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Open rim with rubber (1/row)",
    ref: "EO-051936",
    prices: {
      tv300_6_45_75: 81,
      tv300_6_50_80: 81,
      tv300_7: 81,
      tv300_7s: 81
    }
  },
  {
    id: "herbicide-spray-tube",
    section: "7",
    groupLabel: "Row cleaners / extras",
    label: "Herbicide spray tube (1/row)",
    ref: "EO-101988",
    prices: {
      tv300_6_45_75: 185,
      tv300_6_50_80: 185,
      tv300_7: 185,
      tv300_7s: 185
    }
  },

  // 27. Seed hopper quick discharge
  {
    id: "seed-hopper-quick-discharge",
    section: "8",
    groupLabel: "Seed hopper / discharge",
    label: "Seed hopper quick discharge kit (1/row)",
    ref: "EO-101989",
    prices: {
      tv300_6_45_75: 37,
      tv300_6_50_80: 37,
      tv300_7: 37,
      tv300_7s: 37
    }
  },

  // 28–31. Front hopper & tractor hydraulics
  {
    id: "hydraulic-weight-transfer-kit",
    section: "9",
    groupLabel: "Front hopper & hydraulics",
    label: "Hydraulic tractor weight transfer kit",
    ref: "EO-071931",
    prices: {
      tv300_6_45_75: 1736,
      tv300_6_50_80: 1736,
      tv300_7: 1736,
      tv300_7s: 1736
    }
  },
  {
    id: "hopper-200l",
    section: "9",
    groupLabel: "Front hopper & hydraulics",
    label: "200 L front hopper",
    ref: "EO-071932",
    prices: {
      tv300_6_45_75: 225,
      tv300_6_50_80: 225,
      tv300_7: 225,
      tv300_7s: 225
    }
  },
  {
    id: "v20-adapters",
    section: "9",
    groupLabel: "Front hopper & hydraulics",
    label: "V20 adapter kit",
    ref: "EO-071961",
    prices: {
      tv300_6_45_75: 127,
      tv300_6_50_80: 127,
      tv300_7: 127,
      tv300_7s: 127
    }
  },
  {
    id: "hydraulic-kit-2-function",
    section: "9",
    groupLabel: "Front hopper & hydraulics",
    label: "2-function hydraulic kit in 1 drive",
    ref: "EO-071936",
    prices: {
      tv300_6_45_75: 412,
      tv300_6_50_80: 412,
      tv300_7: 412,
      tv300_7s: 412
    }
  },

  // 32–39. Fertiliser system
  {
    id: "fert-hopper-1400l",
    section: "10",
    groupLabel: "Fertiliser system",
    label: "Fertiliser hopper 1400 L",
    ref: "EO-071933 / 071934",
    prices: {
      tv300_6_45_75: 14328,
      tv300_6_50_80: 14328,
      tv300_7: 14328,
      tv300_7s: 14328
    }
  },
  {
    id: "fert-head-front-hopper",
    section: "10",
    groupLabel: "Fertiliser system",
    label: "Fertiliser head for front hopper Ø120",
    ref: "EO-101970 / 101971",
    prices: {
      tv300_6_45_75: 2694,
      tv300_6_50_80: 2694,
      tv300_7: 2934,
      tv300_7s: 2934
    }
  },
  {
    id: "fert-disc-single-right",
    section: "10",
    groupLabel: "Fertiliser system",
    label:
      '16" single fertiliser disc opener with right control wheel (1/row)',
    ref: "EO-051924",
    prices: {
      tv300_6_45_75: 1070,
      tv300_6_50_80: 1070,
      tv300_7: 1070,
      tv300_7s: 1070
    }
  },
  {
    id: "fert-disc-single-left",
    section: "10",
    groupLabel: "Fertiliser system",
    label:
      '16" single fertiliser disc opener with left control wheel (1/row)',
    ref: "EO-051924/I",
    prices: {
      tv300_6_45_75: 1070,
      tv300_6_50_80: 1070,
      tv300_7: 1070,
      tv300_7s: 1070
    }
  },
  {
    id: "fert-disc-dual-right",
    section: "10",
    groupLabel: "Fertiliser system",
    label: '15" dual fertiliser right discs (1/row)',
    ref: "EO-051925/D",
    prices: {
      tv300_6_45_75: 701,
      tv300_6_50_80: 701,
      tv300_7: 701,
      tv300_7s: 701
    }
  },
  {
    id: "fert-disc-dual-left",
    section: "10",
    groupLabel: "Fertiliser system",
    label: '15" dual fertiliser left disc (1/row)',
    ref: "EO-051925/I",
    prices: {
      tv300_6_45_75: 701,
      tv300_6_50_80: 701,
      tv300_7: 701,
      tv300_7s: 701
    }
  },
  {
    id: "fert-coulter-right",
    section: "10",
    groupLabel: "Fertiliser system",
    label: "Fertiliser coulter right (1/row)",
    ref: "EO-051926/D",
    prices: {
      tv300_6_45_75: 588,
      tv300_6_50_80: 588,
      tv300_7: 588,
      tv300_7s: 588
    }
  },
  {
    id: "fert-coulter-left",
    section: "10",
    groupLabel: "Fertiliser system",
    label: "Fertiliser coulter left (1/row)",
    ref: "EO-051926/I",
    prices: {
      tv300_6_45_75: 588,
      tv300_6_50_80: 588,
      tv300_7: 588,
      tv300_7s: 588
    }
  },

  // 40–47. Microgranular
  {
    id: "micro-front-hopper-aura",
    section: "11",
    groupLabel: "Microgranular",
    label: "Front hopper microgranular AURA-T-MOTOR from planter ECU",
    ref: "EO-106260",
    prices: {
      tv300_6_45_75: 715,
      tv300_6_50_80: 715,
      tv300_7: 715,
      tv300_7s: 715
    }
  },
  {
    id: "micro-2nd-equip-20l-a",
    section: "11",
    groupLabel: "Microgranular",
    label: "2nd microgranular equipment with 20 L hoppers (variant A)",
    ref: "EO-101964 / 101949",
    prices: {
      tv300_6_45_75: 5036,
      tv300_6_50_80: 5036,
      tv300_7: 5877,
      tv300_7s: 5877
    }
  },
  {
    id: "micro-2nd-equip-20l-b",
    section: "11",
    groupLabel: "Microgranular",
    label: "2nd microgranular equipment with 20 L hoppers (variant B)",
    ref: "EO-101966 / 101953",
    prices: {
      tv300_6_45_75: 5044,
      tv300_6_50_80: 5044,
      tv300_7: 5892,
      tv300_7s: 5892
    }
  },
  {
    id: "micro-tube-between-discs",
    section: "11",
    groupLabel: "Microgranular",
    label:
      "Microgranular incorporate tube between seed opener discs (1/row)",
    ref: "EO-101955",
    prices: {
      tv300_6_45_75: 29,
      tv300_6_50_80: 29,
      tv300_7: 29,
      tv300_7s: 29
    }
  },
  {
    id: "micro-tube-between-discs-2",
    section: "11",
    groupLabel: "Microgranular",
    label:
      "Microgranular incorporate tube between closing wheels (1/row)",
    ref: "EO-101956",
    prices: {
      tv300_6_45_75: 62,
      tv300_6_50_80: 62,
      tv300_7: 62,
      tv300_7s: 62
    }
  },
  {
    id: "micro-rear-tube",
    section: "11",
    groupLabel: "Microgranular",
    label: "Rear microgranular incorporator tube (1/row)",
    ref: "EO-101982",
    prices: {
      tv300_6_45_75: 142,
      tv300_6_50_80: 142,
      tv300_7: 142,
      tv300_7s: 142
    }
  },
  {
    id: "micro-hopper-level-sensor",
    section: "11",
    groupLabel: "Microgranular",
    label: "Microgranular hopper level sensor in 2 central row units",
    ref: "EO-101985",
    prices: {
      tv300_6_45_75: 363,
      tv300_6_50_80: 363,
      tv300_7: 363,
      tv300_7s: 363
    }
  },

  // 48–51. Row markers
  {
    id: "markers-hydraulic",
    section: "12",
    groupLabel: "Row markers",
    label: "Hydraulic row markers",
    ref: "EO-101981 / 101982",
    prices: {
      tv300_6_45_75: 2045,
      tv300_6_50_80: 2045,
      tv300_7: 2045,
      tv300_7s: 2504
    }
  },
  {
    id: "markers-hydraulic-single-disc",
    section: "12",
    groupLabel: "Row markers",
    label:
      "Hydraulic row markers for models with single disc fertiliser openers",
    ref: "EO-101987",
    prices: {
      tv300_6_45_75: 2473,
      tv300_6_50_80: 2473,
      tv300_7: 2473,
      tv300_7s: 2473
    }
  },
  {
    id: "marker-discs-depth-control",
    section: "12",
    groupLabel: "Row markers",
    label: "Row marker discs with depth control wheels",
    ref: "EO-371755",
    prices: {
      tv300_6_45_75: 162,
      tv300_6_50_80: 162,
      tv300_7: 162,
      tv300_7s: 162
    }
  },
  {
    id: "marker-discs-depth-control-non-till",
    section: "12",
    groupLabel: "Row markers",
    label:
      "Row marker discs with depth control wheels (non-till sowing / dispatch)",
    ref: "EO-371755",
    prices: {
      tv300_6_45_75: 162,
      tv300_6_50_80: 162,
      tv300_7: 162,
      tv300_7s: 162
    }
  }
];

/**
 * Base-machine row = source of basePrice for each model.
 */
const BASE_MACHINE_ROW = PRECISION_OPTION_TABLE.find(
  (row) => row.id === "base-machine"
)!;

function getBasePrice(model: ModelKey): number {
  return BASE_MACHINE_ROW.prices[model];
}

/**
 * Build optionGroups for a given model key from the master table.
 * We group by "groupLabel" so the tabs read nicely:
 *   Base machine / Frame & drives / Row units & downforce / …
 *
 * NOTE: we skip the "base-machine" row here because its price is used
 * as ProductConfig.basePrice instead of a toggleable option.
 */
function buildOptionGroups(model: ModelKey) {
  const byGroup = new Map<
    string,
    {
      id: string;
      label: string;
      options: { id: string; label: string; priceDelta: number }[];
    }
  >();

  for (const row of PRECISION_OPTION_TABLE) {
    if (row.id === "base-machine") continue; // handled as basePrice

    const groupId = row.groupLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!byGroup.has(groupId)) {
      byGroup.set(groupId, {
        id: groupId,
        label: row.groupLabel,
        options: []
      });
    }

    const group = byGroup.get(groupId)!;
    const priceDelta = row.prices[model];

    group.options.push({
      id: row.id,
      label: row.label,
      priceDelta
    });
  }

  return Array.from(byGroup.values());
}

/**
 * Base template for all precision planter models.
 * (Let TS infer the type; we override all key fields when building
 * each ProductConfig below.)
 */
const basePrecision = {
  ...jaguar1200,
  family: "Precision Planters"
};

// Four concrete models for the main page

export const tv300_6_45_75: ProductConfig = {
  ...basePrecision,
  id: "tv300-6-45-75",
  name: "TV 300/6 45-75",
  subtitle: "Telescopic frame, 6 rows, 45–75 cm",
  basePrice: getBasePrice("tv300_6_45_75"),
  headlineSpecs: tv300HeadlineSpecs.tv300_6_45_75,
  specTableKey: "tv300",
  optionGroups: buildOptionGroups("tv300_6_45_75")
};

export const tv300_6_50_80: ProductConfig = {
  ...basePrecision,
  id: "tv300-6-50-80",
  name: "TV 300/6 50-80",
  subtitle: "Telescopic frame, 6 rows, 50–80 cm",
  basePrice: getBasePrice("tv300_6_50_80"),
  headlineSpecs: tv300HeadlineSpecs.tv300_6_50_80,
  specTableKey: "tv300",
  optionGroups: buildOptionGroups("tv300_6_50_80")
};

export const tv300_7: ProductConfig = {
  ...basePrecision,
  id: "tv300-7",
  name: "TV 300/7",
  subtitle: "Telescopic frame, 7 rows",
  basePrice: getBasePrice("tv300_7"),
  headlineSpecs: tv300HeadlineSpecs.tv300_7,
  specTableKey: "tv300",
  optionGroups: buildOptionGroups("tv300_7")
};

export const tv300_7s: ProductConfig = {
  ...basePrecision,
  id: "tv300-7s",
  name: "TV 300/7 S",
  subtitle: "Telescopic frame, 7 rows (S version)",
  basePrice: getBasePrice("tv300_7s"),
  headlineSpecs: tv300HeadlineSpecs.tv300_7s,
  specTableKey: "tv300",
  optionGroups: buildOptionGroups("tv300_7s")
};
