/**
 * Jieneng Product Data — All product models, specs, and categories
 * Company: Guangdong Jieneng Electrical Technology Co., Ltd.
 * Website: https://www.stjieneng.com
 */

const PRODUCT_DATA = {
  categories: [
    {
      id: "explosion-proof",
      name: "Explosion-Proof Steam Cleaner",
      subtitle: "ATEX & EAC Certified for Hazardous Environments",
      description: "Certified for use in Zone 1 & Zone 2 hazardous areas with flammable gases, vapors, or dust. Equipped with explosion-proof motors, electrical components, and enclosures meeting EU ATEX 2014/34/EU and EAEU TR CU 012/2011 standards.",
      icon: "🛡️",
      heroImage: "images/explosion-proof/jnx-g36-hero.jpg",
      models: ["jnx-g36", "jnx-ex20"]
    },
    {
      id: "industrial-steam",
      name: "Industrial Steam Cleaner",
      subtitle: "High-Temperature High-Pressure Steam Cleaning Systems",
      description: "From 6kW to 48kW, PLC-controlled industrial steam cleaners delivering saturated steam up to 210°C and 25 bar. Ideal for manufacturing, automotive, steel, and mechanical engineering industries.",
      icon: "🏭",
      heroImage: "images/industrial-steam/jnx-36-hero.jpg",
      models: ["jnx-6", "jnx-10", "jnx-18", "jnx-24", "jnx-36", "jnx-48", "jnx-g40"]
    },
    {
      id: "precision-parts",
      name: "Precision Parts Steam Cleaner",
      subtitle: "Automated Cleaning for Machined Components",
      description: "Specialized steam cleaning systems for precision machined parts — shock absorber cylinders, motor shafts, saw blades, and other tight-tolerance components. Features quick-change tooling and automated loading/unloading.",
      icon: "⚙️",
      heroImage: "images/precision-parts/precision-hero.jpg",
      models: ["precision-jnx-6", "precision-jnx-12", "precision-jnx-18", "precision-jnx-24"]
    },
    {
      id: "steam-car-wash",
      name: "Steam Car Wash Machine",
      subtitle: "Eco-Friendly Car Detailing with Dry & Wet Steam",
      description: "Instant-heat steam car wash systems producing steam in 60 seconds. Dry/wet adjustable steam cleans exterior paint, interior upholstery, engines, and AC vents without chemicals — saving 95% water vs. traditional car wash.",
      icon: "🚗",
      heroImage: "images/steam-car-wash/jnx-12-carwash-hero.jpg",
      models: ["jnx-12000-i", "jnx-18000-ii"]
    },
    {
      id: "crawler-pv",
      name: "Crawler PV Panel Cleaning Robot",
      subtitle: "Automated Solar Panel Cleaning with Crawler Platform",
      description: "Self-propelled crawler robot for cleaning photovoltaic panels on solar farms. Low-water steam cleaning removes dust, bird droppings, and grime without damaging panel surfaces or leaving water spots.",
      icon: "☀️",
      heroImage: "images/crawler-pv/jnx-l-hero.jpg",
      models: ["jnx-l"]
    },
    {
      id: "automated-cleaning",
      name: "Automated Cleaning System",
      subtitle: "Turnkey Automated Cleaning Lines for Production",
      description: "Fully automated cleaning lines integrating steam cleaning, hot water rinsing, rust prevention, and drying. Custom-engineered for shock absorber oil cylinders, motor shafts, saw blades, and other serial production parts.",
      icon: "🔧",
      heroImage: "images/automated/automated-hero.jpg",
      models: ["oil-cylinder-auto", "bar-stock-auto", "motor-shaft-auto"]
    }
  ],

  products: {
    // ==================== EXPLOSION-PROOF ====================
    "jnx-g36": {
      model: "JNX-G36",
      category: "explosion-proof",
      name: "Explosion-Proof High Pressure Steam Cleaner",
      tagline: "36kW ATEX & EAC Certified Industrial Steam Cleaner",
      power: "36 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "15–20 bar",
      steamTemp: "170–210 °C",
      steamFlow: "72–105 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "60 L",
      hoseLength: "10 m",
      gunCount: "1",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      dimensions: "1200 × 560 × 740 mm",
      weight: "160 kg",
      packageDimensions: "1380 × 630 × 900 mm",
      packageWeight: "135 kg",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      certifications: "ATEX 2014/34/EU, EAC TR CU 012/2011",
      leadTime: "72 hours",
      origin: "Shantou, Guangdong, China",
      features: [
        "ATEX & EAC dual international explosion-proof certification",
        "36kW high-power instant heating — steam in 60 seconds",
        "15–20 bar adjustable pressure for heavy-duty degreasing",
        "Stainless steel shell & inner tank for harsh environments",
        "PLC intelligent control with 10-inch touch screen",
        "24-hour continuous operation capability",
        "Complete safety system: low-water, over-pressure, leakage, emergency stop",
        "60L large-capacity water tank for extended unattended operation"
      ],
      applications: [
        "Oil & gas facilities",
        "Chemical & petrochemical plants",
        "Pharmaceutical manufacturing",
        "Mining & dust-laden environments",
        "Grain storage & processing",
        "Paint & coating workshops"
      ],
      images: {
        hero: "images/explosion-proof/jnx-g36-hero.jpg",
        gallery: [
          "images/explosion-proof/jnx-g36-01.jpg",
          "images/explosion-proof/jnx-g36-02.jpg",
          "images/explosion-proof/jnx-g36-03.jpg",
          "images/explosion-proof/jnx-g36-04.jpg",
          "images/explosion-proof/jnx-g36-05.jpg"
        ]
      },
      faq: [
        { q: "What explosion-proof certifications does the JNX-G36 hold?", a: "The JNX-G36 meets EU ATEX 2014/34/EU and EAEU TR CU 012/2011 standards. Explosion-proof configuration and certificate documents can be provided for project review when applicable." },
        { q: "Can the JNX-G36 operate continuously?", a: "Yes. The JNX-G36 is designed for 24-hour continuous operation with its 36kW heating system and 60L water tank." },
        { q: "What is the steam temperature range?", a: "The steam temperature is adjustable from 170°C to 210°C, suitable for both heavy-duty degreasing and more delicate cleaning tasks." },
        { q: "What industries is the JNX-G36 suitable for?", a: "It is designed for Zone 1 & Zone 2 hazardous areas including oil & gas, chemical, pharmaceutical, mining, grain processing, and paint workshops." },
        { q: "What is the lead time for delivery?", a: "Standard lead time is 72 hours from order confirmation, ex-works Shantou, Guangdong." },
        { q: "Does Jieneng provide on-site installation?", a: "Yes. Jieneng provides nationwide on-site installation, commissioning, and operator training in China. For overseas projects, remote technical guidance and video training are available." }
      ]
    },

    "jnx-ex20": {
      model: "JNX-EX20",
      category: "explosion-proof",
      name: "Explosion-Proof Compact Steam Cleaner",
      tagline: "20Mpa Explosion-Proof Steam Cleaner with ATEX & EAC",
      power: "5.5 kW (explosion-proof motor)",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "0–20 MPa (adjustable)",
      steamTemp: "160–220 °C",
      controlSystem: "PLC + 10-inch Touch Screen",
      pumpBrand: "Italian AR Plunger Pump",
      certifications: "ATEX 2014/34/EU, EAC TR CU 012/2011",
      features: [
        "ATEX & EAC dual international explosion-proof certification",
        "0–20 MPa fully adjustable pressure",
        "Italian AR high-pressure plunger pump — 24h continuous rated",
        "PLC + 10-inch touch screen intelligent control",
        "Explosion-proof motor and electrical components",
        "Compact footprint for confined spaces"
      ],
      applications: [
        "Oil & gas pipeline maintenance",
        "Chemical plant equipment cleaning",
        "Hazardous area degreasing",
        "Mining equipment maintenance"
      ],
      images: {
        hero: "images/explosion-proof/jnx-ex20-hero.jpg",
        gallery: []
      },
      faq: [
        { q: "How does the JNX-EX20 differ from the JNX-G36?", a: "The JNX-EX20 features a higher pressure range (0–20 MPa) with an Italian AR plunger pump, making it suitable for applications requiring very high pressure. The JNX-G36 offers higher steam flow for steam-centric cleaning." }
      ]
    },

    // ==================== INDUSTRIAL STEAM ====================
    "jnx-6": {
      model: "JNX-6",
      category: "industrial-steam",
      name: "Compact Steam Cleaner",
      tagline: "2.1kW Portable Steam Cleaner for Light Industrial & Commercial Use",
      power: "2.1 kW (2100W)",
      voltage: "110V / 60Hz (also available 220V / 50Hz)",
      steamPressure: "4–6 bar",
      steamTemp: "140–170 °C",
      steamFlow: "—",
      heatUpTime: "60 seconds",
      tankCapacity: "5 L",
      hoseLength: "4 m",
      gunCount: "1",
      controlSystem: "PLC Touch Screen Control",
      dimensions: "400 × 250 × 495 mm",
      weight: "18.2 kg",
      packageDimensions: "425 × 330 × 520 mm",
      packageWeight: "21 kg",
      safetyProtections: "Low-water shutdown alarm, Pressure control sensor, Temperature control sensor",
      features: [
        "Ultra-compact and portable — only 18.2 kg",
        "PLC touch screen control system",
        "4–6 bar steam pressure for light industrial and commercial cleaning",
        "110V / 60Hz for North American markets",
        "5L water tank for mobile operation",
        "Low-water shutdown alarm protection"
      ],
      applications: [
        "Commercial kitchen cleaning",
        "Bathroom & tile sanitation",
        "Small workshop degreasing",
        "Pet & animal housing cleaning"
      ],
      images: {
        hero: "images/industrial-steam/jnx-6-hero.jpg",
        gallery: []
      },
      faq: []
    },

    "jnx-10": {
      model: "JNX-10",
      category: "industrial-steam",
      name: "Industrial Steam Cleaner for Rail Maintenance Workshop",
      tagline: "10kW Dry Steam Cleaning Machine for Locomotive Underframe, Bogie & Brake System Cleaning",
      power: "10 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "6–10 bar",
      steamTemp: "170–210 °C",
      steamFlow: "20–30 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "18 L",
      hoseLength: "10 m",
      gunCount: "1",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      dimensions: "720 × 490 × 760 mm",
      weight: "40 kg",
      packageDimensions: "870 × 650 × 905 mm",
      packageWeight: "50 kg",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      origin: "Shantou, Guangdong, China",
      features: [
        "10kW instant steam generator — steam ready in 60 seconds",
        "6–10 bar adjustable dry steam pressure for controlled degreasing",
        "170–210°C high-temperature steam softens grease, oil film, carbon deposits",
        "Low water consumption vs. traditional high-volume pressure washing",
        "PLC control system with clear pressure and temperature monitoring",
        "Multiple safety protection: low-water, over-pressure, leakage, emergency stop",
        "Stainless steel shell and inner tank for long service life",
        "24-hour industrial duty with 18L water tank and 10m working radius"
      ],
      applications: [
        "Locomotive underframe cleaning",
        "Bogie and brake system cleaning",
        "Engine bay cleaning",
        "Bearing and component degreasing",
        "Brake dust and carbon deposit softening",
        "Workshop floor degreasing",
        "Heat-based sanitation of workshop facilities",
        "Maintenance cleaning in tropical and humid project sites"
      ],
      images: {
        hero: "images/industrial-steam/jnx-10-hero.jpg",
        gallery: []
      },
      faq: [
        { q: "What is the JNX-10 Industrial Steam Cleaner used for?", a: "The JNX-10 is used for rail maintenance workshop cleaning, locomotive underframe cleaning, engine bay cleaning, bogie and brake system cleaning, bearing and component degreasing, workshop floor cleaning and heat-based sanitation." },
        { q: "Is JNX-10 suitable for locomotive underframe cleaning?", a: "Yes. The JNX-10 provides 6–10 bar steam pressure and 170–210°C high-temperature steam, helping soften grease, oil film and carbon deposits on locomotive underframes and maintenance components." },
        { q: "What power supply does JNX-10 require?", a: "The standard JNX-10 requires 380V / 50Hz / 3-phase power supply. For 10kW continuous industrial steam output, three-phase power is recommended." },
        { q: "Can JNX-10 reduce water consumption compared with pressure washing?", a: "Yes. Steam cleaning uses high-temperature steam as the main cleaning medium and can reduce water consumption and workshop flooding compared with high-volume water washing." },
        { q: "Can the JNX-10 be used in Africa rail maintenance projects?", a: "Yes. The machine is suitable for industrial maintenance workshops, including tropical and humid project environments. Final configuration should be confirmed according to site power supply, water quality and cleaning tasks." },
        { q: "Does JNX-10 include a 10m steam hose?", a: "Yes. The standard configuration includes a 10m heat-resistant steam hose and one steam gun." }
      ]
    },

    "jnx-18": {
      model: "JNX-18",
      category: "industrial-steam",
      name: "Industrial Steam Cleaner 18kW",
      tagline: "18kW Entry-Level Industrial Steam Cleaner",
      power: "18 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "10–15 bar",
      steamTemp: "170–210 °C",
      steamFlow: "36–54 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "18 L",
      hoseLength: "10 m",
      gunCount: "1",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      dimensions: "800 × 520 × 730 mm",
      weight: "73 kg",
      packageDimensions: "890 × 570 × 870 mm",
      packageWeight: "80 kg",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      origin: "Shantou, Guangdong, China",
      features: [
        "18kW industrial-grade heating for reliable steam output",
        "10–15 bar adjustable pressure",
        "PLC intelligent control system",
        "Stainless steel construction for durability",
        "Compact 73 kg unit — easy to position in workshops",
        "24-hour continuous operation"
      ],
      applications: [
        "Automotive parts cleaning",
        "Mechanical workshop degreasing",
        "Food processing equipment sanitation",
        "Light manufacturing cleaning"
      ],
      images: {
        hero: "images/industrial-steam/jnx-18-hero.jpg",
        gallery: [
          "images/industrial-steam/jnx-18-detail-01.png",
          "images/industrial-steam/jnx-18-detail-02.png",
          "images/industrial-steam/jnx-18-detail-03.png",
          "images/industrial-steam/jnx-18-detail-04.png"
        ]
      },
      faq: []
    },

    "jnx-24": {
      model: "JNX-24",
      category: "industrial-steam",
      name: "Industrial Steam Cleaner 24kW",
      tagline: "24kW Medium-Duty Industrial Steam Cleaner",
      power: "24 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "15–18 bar",
      steamTemp: "170–210 °C",
      steamFlow: "48–72 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "18 L",
      hoseLength: "10 m",
      gunCount: "1",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      dimensions: "1150 × 560 × 720 mm",
      weight: "98 kg",
      packageDimensions: "1220 × 625 × 895 mm",
      packageWeight: "105 kg",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      origin: "Shantou, Guangdong, China",
      features: [
        "24kW balanced power for mid-range industrial applications",
        "15–18 bar pressure with 48–72 L/H steam flow",
        "PLC intelligent control system",
        "Stainless steel construction",
        "24-hour continuous operation",
        "98 kg manageable weight for workshop mobility"
      ],
      applications: [
        "Automotive manufacturing cleaning",
        "Steel surface treatment",
        "Paint shop equipment maintenance",
        "Mechanical processing cleaning"
      ],
      images: {
        hero: "images/industrial-steam/jnx-24-hero.jpg",
        gallery: []
      },
      faq: []
    },

    "jnx-36": {
      model: "JNX-36",
      category: "industrial-steam",
      name: "Industrial Steam Cleaner 36kW",
      tagline: "36kW High-Performance Industrial Steam Cleaner — Best Seller",
      power: "36 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "15–20 bar",
      steamTemp: "170–210 °C",
      steamFlow: "72–108 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "18 L",
      hoseLength: "10 m",
      gunCount: "1",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      dimensions: "1150 × 560 × 720 mm",
      weight: "105 kg",
      packageDimensions: "1220 × 625 × 895 mm",
      packageWeight: "120 kg",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      origin: "Shantou, Guangdong, China",
      features: [
        "36kW best-selling configuration for demanding industrial cleaning",
        "15–20 bar pressure with 72–108 L/H high-volume steam output",
        "PLC intelligent control system",
        "Stainless steel construction for corrosive environments",
        "24-hour continuous operation",
        "Comprehensive safety protection system"
      ],
      applications: [
        "Heavy automotive parts degreasing",
        "Industrial equipment maintenance",
        "Manufacturing line cleaning",
        "Chemical & petrochemical surface cleaning",
        "Steel & metal processing"
      ],
      images: {
        hero: "images/industrial-steam/jnx-36-hero.jpg",
        gallery: []
      },
      faq: []
    },

    "jnx-48": {
      model: "JNX-48",
      category: "industrial-steam",
      name: "Industrial Steam Cleaner 48kW",
      tagline: "48kW Heavy-Duty Industrial Steam Cleaner — Maximum Power",
      power: "48 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "20–25 bar",
      steamTemp: "170–210 °C",
      steamFlow: "96–144 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "60 L",
      hoseLength: "10 m",
      gunCount: "1",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      dimensions: "1080 × 650 × 990 mm",
      weight: "120 kg",
      packageDimensions: "1240 × 690 × 1210 mm",
      packageWeight: "150 kg",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      origin: "Shantou, Guangdong, China",
      features: [
        "48kW maximum power in the JNX series",
        "20–25 bar highest pressure with 96–144 L/H maximum steam flow",
        "60L large-capacity water tank for extended operation",
        "PLC intelligent control system",
        "Stainless steel construction",
        "24-hour continuous operation for production environments"
      ],
      applications: [
        "Heavy industry degreasing",
        "Large-scale manufacturing cleaning",
        "Steel mill & foundry cleaning",
        "Shipyard & marine equipment maintenance"
      ],
      images: {
        hero: "images/industrial-steam/jnx-48-hero.jpg",
        gallery: []
      },
      faq: []
    },

    "jnx-g40": {
      model: "JNX-G40",
      category: "industrial-steam",
      name: "Explosion-Proof High Pressure Hot Water Cleaner",
      tagline: "40kW Explosion-Proof Hot Water & Steam Dual-Mode Cleaner",
      power: "40 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "—",
      steamTemp: "—",
      controlSystem: "PLC Control",
      certifications: "ATEX 2014/34/EU, EAC TR CU 012/2011",
      features: [
        "Dual-mode: high-pressure hot water + steam cleaning",
        "ATEX & EAC dual explosion-proof certification",
        "PLC intelligent control system",
        "Bilingual (Chinese/English) documentation available",
        "Suitable for hazardous area industrial cleaning"
      ],
      applications: [
        "Hazardous area equipment cleaning",
        "Oil field & refinery maintenance",
        "Chemical plant surface treatment"
      ],
      images: {
        hero: "images/industrial-steam/jnx-g40-hero.jpg",
        gallery: []
      },
      faq: []
    },

    // ==================== STEAM CAR WASH ====================
    "jnx-12000-i": {
      model: "JNX-12000-I",
      category: "steam-car-wash",
      name: "Steam Car Wash Machine 12kW (Single Gun)",
      tagline: "12kW Single-Gun Instant Steam Car Wash System",
      power: "12 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "10–15 bar",
      steamTemp: "150–190 °C",
      steamFlow: "24–36 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "18 L",
      hoseLength: "10 m",
      gunCount: "1 (single gun)",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      dimensions: "720 × 490 × 700 mm",
      weight: "180 kg",
      packageDimensions: "870 × 605 × 905 mm",
      packageWeight: "45 kg",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      origin: "Shantou, Guangdong, China",
      features: [
        "Instant heating — steam ready in 60 seconds",
        "Dry/wet steam adjustable for different car surfaces",
        "95% water saving vs. traditional car wash",
        "No chemicals needed — pure steam cleaning",
        "Safe for car paint, interior, leather, and AC vents",
        "Compact size suitable for car detailing shops"
      ],
      applications: [
        "Car exterior steam cleaning",
        "Interior upholstery & leather cleaning",
        "Engine bay degreasing",
        "AC vent sanitization & deodorizing",
        "Wheel hub & tire cleaning"
      ],
      images: {
        hero: "images/steam-car-wash/jnx-12-carwash-hero.jpg",
        gallery: []
      },
      faq: [
        { q: "Does steam car wash damage car paint?", a: "No. The steam temperature (150–190°C) and pressure (10–15 bar) are calibrated to be effective on dirt while safe for automotive clear coats, paint, and interior materials." },
        { q: "How much water does a steam car wash use?", a: "A typical full-car steam wash uses only 3–5 liters of water, compared to 150–200 liters for a traditional car wash — saving over 95%." },
        { q: "Can it clean car interiors?", a: "Yes. The dry steam mode is ideal for cleaning leather seats, fabric upholstery, dashboards, and AC vents without leaving excess moisture." }
      ]
    },

    "jnx-18000-ii": {
      model: "JNX-18000-II",
      category: "steam-car-wash",
      name: "Steam Car Wash Machine 18kW (Dual Gun)",
      tagline: "18kW Dual-Gun Steam Car Wash for High-Volume Operations",
      power: "18 kW",
      voltage: "380V / 50Hz / 3-Phase",
      steamPressure: "10–15 bar",
      steamTemp: "170–210 °C",
      steamFlow: "36–54 L/H",
      heatUpTime: "60 seconds",
      tankCapacity: "18 L",
      hoseLength: "10 m",
      gunCount: "2 (dual gun)",
      controlSystem: "PLC Control",
      shellMaterial: "Stainless Steel",
      innerMaterial: "Stainless Steel",
      continuousOperation: "24 hours",
      safetyProtections: "Low-water protection, Over-pressure protection, Leakage protection, Emergency stop",
      warranty: "1 year",
      origin: "Shantou, Guangdong, China",
      features: [
        "Dual gun operation — two operators can wash simultaneously",
        "18kW high power for continuous high-volume steam",
        "Dry/wet steam adjustable",
        "95% water saving vs. traditional car wash",
        "No chemicals needed",
        "24-hour continuous operation for busy car wash stations"
      ],
      applications: [
        "High-volume car wash stations",
        "Automotive detailing centers",
        "Fleet vehicle maintenance",
        "Used car reconditioning"
      ],
      images: {
        hero: "images/steam-car-wash/jnx-18-carwash-hero.jpg",
        gallery: []
      },
      faq: []
    },

    // ==================== CRAWLER PV ====================
    "jnx-l": {
      model: "JNX-L",
      category: "crawler-pv",
      name: "Crawler Photovoltaic Panel Cleaning Robot",
      tagline: "Automated Crawler Robot for Solar Farm Panel Cleaning",
      controlSystem: "Automated / Remote Control",
      features: [
        "Self-propelled crawler platform for solar panel arrays",
        "Low-water steam cleaning — no water spots on panels",
        "Remote control or automated path programming",
        "Gentle on panel surfaces — no scratching or thermal shock",
        "Suitable for large-scale solar farm deployment",
        "Reduces manual labor by 80% compared to hand cleaning"
      ],
      applications: [
        "Utility-scale solar farm panel cleaning",
        "Rooftop solar array maintenance",
        "Industrial solar installation cleaning",
        "Agricultural solar panel maintenance"
      ],
      images: {
        hero: "images/crawler-pv/jnx-l-hero.jpg",
        gallery: []
      },
      faq: [
        { q: "How does the crawler robot clean solar panels?", a: "The JNX-L uses low-pressure steam to dissolve dust, bird droppings, and grime on photovoltaic panels. The crawler platform moves along the panel rows autonomously or via remote control." },
        { q: "Will steam cleaning damage solar panels?", a: "No. The steam temperature and pressure are calibrated to be gentle on tempered glass panel surfaces while effectively removing contaminants." }
      ]
    },

    // ==================== PRECISION PARTS ====================
    "precision-jnx-6": {
      model: "JNX-6P",
      category: "precision-parts",
      name: "Precision Parts Steam Cleaner (6kW)",
      tagline: "6kW Benchtop Steam Cleaner for Small Precision Parts",
      power: "6 kW",
      features: [
        "Compact benchtop design for small precision parts",
        "Steam cleaning + hot water rinsing + drying",
        "PLC + touch screen control",
        "Quick-change tooling for different part geometries"
      ],
      applications: ["Small machined parts", "Electronic components", "Watch & instrument parts"],
      images: { hero: "", gallery: [] },
      faq: []
    },

    "precision-jnx-12": {
      model: "JNX-12P",
      category: "precision-parts",
      name: "Precision Parts Steam Cleaner (12kW)",
      tagline: "12kW Mid-Range Precision Parts Cleaning System",
      power: "12 kW",
      steamPressure: "10–12 bar",
      steamTemp: "150–220 °C",
      steamFlow: "24–36 L/H",
      tankCapacity: "18 L",
      voltage: "380V",
      features: [
        "12kW heating for reliable precision cleaning",
        "Steam + hot water + dry/wet adjustable",
        "PLC + touch screen control",
        "Quick-change fixtures for batch processing"
      ],
      applications: ["Shock absorber components", "Motor shafts", "Saw blades & cutting tools"],
      images: { hero: "", gallery: [] },
      faq: []
    },

    "precision-jnx-18": {
      model: "JNX-18P",
      category: "precision-parts",
      name: "Precision Parts Steam Cleaner (18kW)",
      tagline: "18kW Automated Precision Parts Cleaning System",
      power: "18 kW",
      features: [
        "18kW with automated loading/unloading capability",
        "Steam cleaning + rinsing + rust prevention + drying",
        "PLC + touch screen with recipe memory",
        "Quick-change tooling — 10-minute changeover"
      ],
      applications: ["Automotive precision parts", "Aerospace components", "Medical device parts"],
      images: { hero: "", gallery: [] },
      faq: []
    },

    "precision-jnx-24": {
      model: "JNX-24P",
      category: "precision-parts",
      name: "Precision Parts Steam Cleaner (24kW)",
      tagline: "24kW High-Volume Precision Parts Cleaning Line",
      power: "24 kW",
      features: [
        "24kW for high-throughput precision cleaning",
        "Full automation: loading → washing → rinsing → rust prevention → drying → unloading",
        "PLC + 10-inch touch screen",
        "Integrated conveyor system for production line integration"
      ],
      applications: ["Automotive production lines", "Mass-produced precision components", "Continuous processing"],
      images: { hero: "", gallery: [] },
      faq: []
    },

    // ==================== AUTOMATED CLEANING ====================
    "oil-cylinder-auto": {
      model: "Oil Cylinder Auto Cleaner",
      category: "automated-cleaning",
      name: "Oil Cylinder Fully Automated Cleaning System",
      tagline: "Turnkey Automated Line: Loading → Coarse Wash → Fine Wash → Rust Prevention → Dewatering → Drying → Unloading",
      controlSystem: "PLC + 10-inch Touch Screen",
      features: [
        "Fully automated: auto-loading → coarse wash → fine wash → rust prevention → dewatering → drying → auto-unloading",
        "Quick-change tooling — 10-minute changeover between part types",
        "PLC + 10-inch touch screen with recipe memory",
        "Inline quality inspection capability",
        "Suitable for shock absorber oil cylinders and similar tubular parts"
      ],
      applications: [
        "Shock absorber oil cylinder cleaning",
        "Hydraulic cylinder bore cleaning",
        "Tubular part interior & exterior cleaning"
      ],
      images: { hero: "", gallery: [] },
      faq: []
    },

    "bar-stock-auto": {
      model: "Bar Stock Auto Cleaner",
      category: "automated-cleaning",
      name: "Bar Stock / Motor Shaft Automated Cleaning System",
      tagline: "Conveyor-Type Automated Spray + Steam Cleaning for Long Workpieces",
      controlSystem: "PLC + Touch Screen",
      features: [
        "Conveyor-type continuous cleaning for long workpieces",
        "Spray + high-temperature steam composite cleaning",
        "Adaptable to bar stock, motor shafts, saw blades",
        "Inline with production line operation"
      ],
      applications: [
        "Motor shaft cleaning",
        "Saw blade cleaning",
        "Long bar stock degreasing"
      ],
      images: { hero: "", gallery: [] },
      faq: []
    },

    "motor-shaft-auto": {
      model: "Motor Shaft Auto Cleaner",
      category: "automated-cleaning",
      name: "Motor Shaft Dedicated Automated Cleaning System",
      tagline: "Custom-Engineered Cleaning Line for Motor Shaft Production",
      controlSystem: "PLC + Touch Screen",
      features: [
        "Purpose-built for motor shaft cleaning requirements",
        "Automated spray + steam composite process",
        "Production line integration",
        "Custom fixture design for shaft geometries"
      ],
      applications: [
        "Electric motor shaft production",
        "Automotive motor shaft manufacturing",
        "Precision shaft cleaning"
      ],
      images: { hero: "", gallery: [] },
      faq: []
    }
  },

  // Company info
  company: {
    name: "Guangdong Jieneng Electrical Technology Co., Ltd.",
    nameCN: "广东洁能电器科技有限公司",
    founded: "—",
    location: "Shantou, Guangdong, China",
    website: "https://www.stjieneng.com",
    email: "stjieneng@gmail.com",
    phone: "+86 13302738777",
    whatsapp: "+86 13302738777",
    landline: "+86 754-88594333",
    certifications: [
      "National High-Tech Enterprise",
      "Specialized & Sophisticated Enterprise (专精特新)",
      "ISO 9001:2015 Quality Management",
      "ISO 14001:2015 Environmental Management",
      "ISO 45001:2018 Occupational Health & Safety",
      "EU ATEX 2014/34/EU Explosion-Proof Certification",
      "EAEU EAC TR CU 012/2011 Explosion-Proof Certification"
    ],
    coreAdvantages: [
      "Original manufacturer with full non-standard customization capability",
      "ATEX + EAC dual international explosion-proof certification",
      "Italian AR high-pressure plunger pump — 24h continuous rated",
      "PLC + 10-inch touch screen intelligent control",
      "High-temperature steam saves 80% water vs. traditional methods",
      "Automated quick-change tooling — 10-minute changeover",
      "Soft water anti-scale + dry/wet steam adjustable",
      "Nationwide on-site service + 3-year warranty",
      "High-Tech & Specialized Enterprise credentials for bidding"
    ]
  }
};
