// src/data/precisionTv300Specs.ts

export type Tv300ModelKey =
  | "tv300_6_45_75"
  | "tv300_6_50_80"
  | "tv300_7"
  | "tv300_7s";

// These match the HeadlineSpecs interface you added in jaguar1200.ts
export interface ModelHeadlineSpecs {
  rows?: string;
  spacing?: string;
  seedHopper?: string;
  microHopper?: string;
}

//  👉 For cards + header (“6 rows · 45–75 cm · 70 L seed hopper”)
export const tv300HeadlineSpecs: Record<Tv300ModelKey, ModelHeadlineSpecs> = {
  tv300_6_45_75: {
    rows: "6 rows",
    spacing: "45–75 cm",
    seedHopper: "70 L seed hopper",
    microHopper: "20 L micro hopper"
  },
  tv300_6_50_80: {
    rows: "6 rows",
    spacing: "50–80 cm",
    seedHopper: "70 L seed hopper",
    microHopper: "20 L micro hopper"
  },
  tv300_7: {
    rows: "7 rows",
    spacing: "7× 45–60 cm / 6× 70–80 cm", // from your table
    seedHopper: "70 L seed hopper",
    microHopper: "20 L micro hopper"
  },
  tv300_7s: {
    rows: "7 rows",
    spacing: "50–80 cm",
    seedHopper: "70 L seed hopper",
    microHopper: "20 L micro hopper"
  }
};

//  👉 For “Technical data” table
export interface TechSpecRow {
  key: string; // e.g. "Frame type"
  values: Partial<Record<Tv300ModelKey, string>>;
}

export const tv300SpecTable: TechSpecRow[] = [
  {
    key: "Frame type",
    values: {
      tv300_6_45_75: "Telescopic frame, variable row spacing",
      tv300_6_50_80: "Telescopic frame, variable row spacing",
      tv300_7: "Telescopic frame, variable row spacing",
      tv300_7s: "Telescopic frame, variable row spacing"
    }
  },
  {
    key: "Coupling category",
    values: {
      tv300_6_45_75: "Cat III",
      tv300_6_50_80: "Cat III",
      tv300_7: "Cat III",
      tv300_7s: "Cat III"
    }
  },
  {
    key: "Sowing unit",
    values: {
      tv300_6_45_75: "VELOX",
      tv300_6_50_80: "VELOX",
      tv300_7: "VELOX",
      tv300_7s: "VELOX"
    }
  },
  {
    key: "Transport width (m)",
    values: {
      tv300_6_45_75: "3.00",
      tv300_6_50_80: "3.00",
      tv300_7: "3.00",
      tv300_7s: "3.00"
    }
  },
  {
    key: "Number of rows",
    values: {
      tv300_6_45_75: "6",
      tv300_6_50_80: "6",
      tv300_7: "7",
      tv300_7s: "7"
    }
  },
  {
    key: "Row spacing according to equipment (cm)",
    values: {
      tv300_6_45_75: "45–75",
      tv300_6_50_80: "50–80",
      tv300_7: "7 rows: 45–60 / 6 rows: 70–80",
      tv300_7s: "50–80"
    }
  },
  {
    key: "Seed rate adjustment",
    values: {
      tv300_6_45_75:
        'From ISOBUS monitor (not included as standard, see "Control monitors")',
      tv300_6_50_80:
        'From ISOBUS monitor (not included as standard, see "Control monitors")',
      tv300_7:
        'From ISOBUS monitor (not included as standard, see "Control monitors")',
      tv300_7s:
        'From ISOBUS monitor (not included as standard, see "Control monitors")'
    }
  },
  {
    key: "Turbine drives",
    values: {
      tv300_6_45_75: "Hydraulic",
      tv300_6_50_80: "Hydraulic",
      tv300_7: "Hydraulic",
      tv300_7s: "Hydraulic"
    }
  },
  {
    key: "Number of support wheels",
    values: {
      tv300_6_45_75: "2",
      tv300_6_50_80: "2",
      tv300_7: "2",
      tv300_7s: "2"
    }
  },
  {
    key: "Wheel sizes",
    values: {
      tv300_6_45_75: "23 × 10.5",
      tv300_6_50_80: "23 × 10.5",
      tv300_7: "23 × 10.5",
      tv300_7s: "23 × 8.5"
    }
  },
  {
    key: "Seed metering unit drives",
    values: {
      tv300_6_45_75: "ISOBUS electric",
      tv300_6_50_80: "ISOBUS electric",
      tv300_7: "ISOBUS electric",
      tv300_7s: "ISOBUS electric"
    }
  },
  {
    key: "Speed take-off",
    values: {
      tv300_6_45_75:
        'Communication via CAN from the tractor (see "ISOBUS control monitors" chapter)',
      tv300_6_50_80:
        'Communication via CAN from the tractor (see "ISOBUS control monitors" chapter)',
      tv300_7:
        'Communication via CAN from the tractor (see "ISOBUS control monitors" chapter)',
      tv300_7s:
        'Communication via CAN from the tractor (see "ISOBUS control monitors" chapter)'
    }
  },
  {
    key: "Sowing controller",
    values: {
      tv300_6_45_75:
        'From ISOBUS monitor (not included as standard, see "Control monitors")',
      tv300_6_50_80:
        'From ISOBUS monitor (not included as standard, see "Control monitors")',
      tv300_7:
        'From ISOBUS monitor (not included as standard, see "Control monitors")',
      tv300_7s:
        'From ISOBUS monitor (not included as standard, see "Control monitors")'
    }
  },
  {
    key: "ISOBUS compatibility",
    values: {
      tv300_6_45_75:
        'Check compatibility between ECU and tractor ISOBUS terminal (see "ISOBUS compatibility questionnaires")',
      tv300_6_50_80:
        'Check compatibility between ECU and tractor ISOBUS terminal (see "ISOBUS compatibility questionnaires")',
      tv300_7:
        'Check compatibility between ECU and tractor ISOBUS terminal (see "ISOBUS compatibility questionnaires")',
      tv300_7s:
        'Check compatibility between ECU and tractor ISOBUS terminal (see "ISOBUS compatibility questionnaires")'
    }
  },
  {
    key: "Tractor hydraulic requirements",
    values: {
      tv300_6_45_75:
        "Hydraulic turbine: 1 SE + free return / Frame opening: 1 DE / Pressure units: 1 DE / Fertiliser turbine: 1 SE / Row marker: 1 SE",
      tv300_6_50_80:
        "Hydraulic turbine: 1 SE + free return / Frame opening: 1 DE / Pressure units: 1 DE / Fertiliser turbine: 1 SE / Row marker: 1 SE",
      tv300_7:
        "Hydraulic turbine: 1 SE + free return / Frame opening: 1 DE / Pressure units: 1 DE / Fertiliser turbine: 1 SE / Row marker: 1 SE",
      tv300_7s:
        "Hydraulic turbine: 1 SE + free return / Frame opening: 1 DE / Pressure units: 1 DE / Fertiliser turbine: 1 SE / Row marker: 1 SE"
    }
  },
  {
    key: "Turbine vacuum gauge controller",
    values: {
      tv300_6_45_75: "Standard analogue vacuum gauge",
      tv300_6_50_80: "Standard analogue vacuum gauge",
      tv300_7: "Standard analogue vacuum gauge",
      tv300_7s: "Standard analogue vacuum gauge"
    }
  },
  {
    key: "Section controls",
    values: {
      tv300_6_45_75:
        'From ISOBUS monitor (license, speed and positioning required – see "Control monitors")',
      tv300_6_50_80:
        'From ISOBUS monitor (license, speed and positioning required – see "Control monitors")',
      tv300_7:
        'From ISOBUS monitor (license, speed and positioning required – see "Control monitors")',
      tv300_7s:
        'From ISOBUS monitor (license, speed and positioning required – see "Control monitors")'
    }
  },
  {
    key: "Variable dosage",
    values: {
      tv300_6_45_75:
        'From ISOBUS monitor (license, speed, positioning & prescription maps required – see "Control monitors")',
      tv300_6_50_80:
        'From ISOBUS monitor (license, speed, positioning & prescription maps required – see "Control monitors")',
      tv300_7:
        'From ISOBUS monitor (license, speed, positioning & prescription maps required – see "Control monitors")',
      tv300_7s:
        'From ISOBUS monitor (license, speed, positioning & prescription maps required – see "Control monitors")'
    }
  },
  {
    key: "Power supply",
    values: {
      tv300_6_45_75:
        "From ISOBUS socket; additional row from tractor battery (depending on options)",
      tv300_6_50_80:
        "From ISOBUS socket; additional row from tractor battery (depending on options)",
      tv300_7:
        "From ISOBUS socket; additional row from tractor battery (depending on options)",
      tv300_7s:
        "From ISOBUS socket; additional row from tractor battery (depending on options)"
    }
  },
  {
    key: "Seed hopper capacity",
    values: {
      tv300_6_45_75: "70 L",
      tv300_6_50_80: "70 L",
      tv300_7: "70 L",
      tv300_7s: "70 L"
    }
  },
  {
    key: "Depth control wheels",
    values: {
      tv300_6_45_75: "Optional: 400×115 blind/radius or 400×65",
      tv300_6_50_80: "Optional: 400×115 blind/radius or 400×65",
      tv300_7: "Optional: 400×115 blind/radius or 400×65",
      tv300_7s: "Optional: 400×115 blind/radius or 400×65"
    }
  },
  {
    key: "Rear closing wheels",
    values: {
      tv300_6_45_75: 'See "Optional" chapter',
      tv300_6_50_80: 'See "Optional" chapter',
      tv300_7: 'See "Optional" chapter',
      tv300_7s: 'See "Optional" chapter'
    }
  },
  {
    key: "Row unit pressure",
    values: {
      tv300_6_45_75:
        "Hydraulic cylinders up to 350 kg / springs with 6 settings up to 250 kg",
      tv300_6_50_80:
        "Hydraulic cylinders up to 350 kg / springs with 6 settings up to 250 kg",
      tv300_7:
        "Hydraulic cylinders up to 350 kg / springs with 6 settings up to 250 kg",
      tv300_7s:
        "Hydraulic cylinders up to 350 kg / springs with 6 settings up to 250 kg"
    }
  },
  {
    key: "Hydraulic row markers",
    values: {
      tv300_6_45_75:
        "Optional, with smooth discs on tractor wheel (1)",
      tv300_6_50_80:
        "Optional, with smooth discs on tractor wheel (1)",
      tv300_7:
        "Optional, with smooth discs on tractor wheel (1)",
      tv300_7s:
        "Optional, with smooth discs on tractor wheel (1)"
    }
  },
  {
    key: "Transport lights",
    values: {
      tv300_6_45_75: "Standard",
      tv300_6_50_80: "Standard",
      tv300_7: "Standard",
      tv300_7s: "Standard"
    }
  },
  {
    key: "Sowing disc coulters",
    values: {
      tv300_6_45_75: "1 set of maize discs included",
      tv300_6_50_80: "1 set of maize discs included",
      tv300_7: "1 set of maize discs included",
      tv300_7s: "1 set of maize discs included"
    }
  },
  {
    key: "Micro hopper capacity",
    values: {
      tv300_6_45_75: "20 L",
      tv300_6_50_80: "20 L",
      tv300_7: "20 L",
      tv300_7s: "20 L"
    }
  },
  {
    key: "Main fertiliser & micro metering drive",
    values: {
      tv300_6_45_75: "ISOBUS electric",
      tv300_6_50_80: "ISOBUS electric",
      tv300_7: "ISOBUS electric",
      tv300_7s: "ISOBUS electric"
    }
  }
];
