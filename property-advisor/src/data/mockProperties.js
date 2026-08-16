export const properties = [
  {
    id: "p1",
    name: "DLF The Arbour",
    developer: "DLF Limited",
    location: "Sector 63, Golf Course Extension Road, Gurugram",
    priceCr: 8.25,
    sizeSqFt: 3956,
    pricePerSqFt: 20854,
    type: "4 BHK + Utility + Staff",
    possession: "Q4 2027",
    riskScore: 9.5, 
    vastuScore: 8.5,
    sunlightScore: 9.0,
    roiEstimate: "12-15% PA",
    amenities: ["100,000 sq.ft Clubhouse", "Temperature Controlled Pool", "Private Elevators", "VRV Air Conditioning", "Triple Height Lobbies"],
    verdict: "A flagship launch by DLF with minimal execution risk. The massive floor plates and premium location make it a highly defensible asset for both end-use and capital appreciation.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200&h=800",
    
    // PRD Fields
    litigationHistory: { status: "clean", detail: "Clear Title. No pending NGT or land dispute cases." },
    constructionQuality: { status: "excellent", detail: "Mivan formwork, backward integrated execution. Historically zero delays." },
    priceToValueRatio: { status: "fair", detail: "Priced at premium but justified by DLF ecosystem monopoly." },
    connectivity: { status: "excellent", detail: "0.5km from upcoming Metro. Direct access to GC Ext Road." },
    reraStatus: { status: "clean", detail: "RERA Approved (RC/REP/HARERA/GGM/2023)" },
    projectedROI: [
      { year: 2024, value: 8.25 },
      { year: 2025, value: 9.50 },
      { year: 2026, value: 10.80 },
      { year: 2027, value: 12.10 },
      { year: 2028, value: 13.50 }
    ],
    // Truth Estate 5-Pillar Score
    confidenceTag: "High",
    subScores: {
      location: 9.5,
      developer: 9.8,
      construction: 9.2,
      legal: 9.9,
      usps: 8.5
    }
  },
  {
    id: "p2",
    name: "M3M Golfestate",
    developer: "M3M India",
    location: "Sector 65, Golf Course Extension Road, Gurugram",
    priceCr: 6.10,
    sizeSqFt: 3600,
    pricePerSqFt: 16944,
    type: "3 BHK + Lounge + Utility",
    possession: "Ready to Move",
    riskScore: 8.0,
    vastuScore: 6.5,
    sunlightScore: 8.0,
    roiEstimate: "5-7% PA (Stabilized)",
    amenities: ["9-Hole Executive Golf Course", "Multiple Clubhouses", "Sports Arena", "Rooftop Jogging Track"],
    verdict: "An established luxury ecosystem. Ideal for buyers prioritizing immediate possession and resort-style living over maximum capital appreciation. Vastu compliance varies heavily by tower.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200&h=800",
    
    // PRD Fields
    litigationHistory: { status: "warning", detail: "Past ED notices to developer; project itself has clear OC/CC." },
    constructionQuality: { status: "good", detail: "Premium finishes, some seepage issues reported in basements." },
    priceToValueRatio: { status: "fair", detail: "Stabilized secondary market pricing." },
    connectivity: { status: "excellent", detail: "Prime GC Ext Road location." },
    reraStatus: { status: "clean", detail: "Delivered (OC Received)" },
    projectedROI: [
      { year: 2024, value: 6.10 },
      { year: 2025, value: 6.40 },
      { year: 2026, value: 6.75 },
      { year: 2027, value: 7.10 },
      { year: 2028, value: 7.50 }
    ],
    // Truth Estate 5-Pillar Score
    confidenceTag: "High",
    subScores: {
      location: 9.0,
      developer: 6.5,
      construction: 8.5,
      legal: 7.5,
      usps: 9.0
    }
  },
  {
    id: "p3",
    name: "Emaar DigiHomes",
    developer: "Emaar India",
    location: "Sector 62, Golf Course Extension, Gurugram",
    priceCr: 3.85,
    sizeSqFt: 1508,
    pricePerSqFt: 25530,
    type: "2 BHK Luxury Smart Home",
    possession: "Ready to Move",
    riskScore: 9.0,
    vastuScore: 7.5,
    sunlightScore: 8.5,
    roiEstimate: "6-8% PA",
    amenities: ["Voice Activated Homes", "Co-working Lounge", "Mini Theater", "Infinity Pool"],
    verdict: "Highly liquid asset. Perfect for young professionals or as a high-yield rental investment. The per-square-foot price is high, but overall ticket size remains accessible.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200&h=800",
    
    // PRD Fields
    litigationHistory: { status: "clean", detail: "100% clean title and Dubai-backed corporate governance." },
    constructionQuality: { status: "excellent", detail: "High-grade automation and strict quality control." },
    priceToValueRatio: { status: "warning", detail: "High per-sqft rate compared to immediate neighbors." },
    connectivity: { status: "excellent", detail: "Direct access to major commercial hubs." },
    reraStatus: { status: "clean", detail: "Delivered (OC Received)" },
    projectedROI: [
      { year: 2024, value: 3.85 },
      { year: 2025, value: 4.10 },
      { year: 2026, value: 4.35 },
      { year: 2027, value: 4.60 },
      { year: 2028, value: 4.90 }
    ],
    // Truth Estate 5-Pillar Score
    confidenceTag: "High",
    subScores: {
      location: 8.5,
      developer: 9.0,
      construction: 8.5,
      legal: 9.5,
      usps: 8.0
    }
  },
  {
    id: "p4",
    name: "Trump Tower Delhi NCR",
    developer: "Tribeca & M3M",
    location: "Sector 65, Gurugram",
    priceCr: 14.50,
    sizeSqFt: 4522,
    pricePerSqFt: 32065,
    type: "4 BHK Signature Residence",
    possession: "Q1 2026",
    riskScore: 7.5,
    vastuScore: 8.0,
    sunlightScore: 9.5,
    roiEstimate: "8-10% PA",
    amenities: ["Signature Glass Facade", "White Glove Services", "Private Cigar Lounge", "Indoor Heated Pool"],
    verdict: "A pure trophy asset. You are paying a significant premium for the brand and the glass facade. Not recommended for pure ROI, but excellent for prestige and networking.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200&h=800",
    
    // PRD Fields
    litigationHistory: { status: "warning", detail: "Joint venture complexities between landowner and brand." },
    constructionQuality: { status: "excellent", detail: "International standards strictly audited by Trump Org." },
    priceToValueRatio: { status: "warning", detail: "Brand premium constitutes ~25% of the asking price." },
    connectivity: { status: "good", detail: "Inside a larger 100+ acre township." },
    reraStatus: { status: "clean", detail: "RERA Approved. Construction delayed by 18 months." },
    projectedROI: [
      { year: 2024, value: 14.50 },
      { year: 2025, value: 15.20 },
      { year: 2026, value: 16.50 },
      { year: 2027, value: 17.40 },
      { year: 2028, value: 18.50 }
    ],
    // Truth Estate 5-Pillar Score
    confidenceTag: "Medium",
    subScores: {
      location: 8.0,
      developer: 7.0,
      construction: 6.5,
      legal: 7.0,
      usps: 9.5
    }
  },
  {
    id: "p5",
    name: "Sobha City",
    developer: "Sobha Developers",
    location: "Sector 108, Dwarka Expressway, Gurugram",
    priceCr: 4.65,
    sizeSqFt: 2072,
    pricePerSqFt: 22442,
    type: "3 BHK Premium",
    possession: "Q2 2025",
    riskScore: 9.5,
    vastuScore: 9.5,
    sunlightScore: 8.5,
    roiEstimate: "10-12% PA",
    amenities: ["8.5 Acre Central Park", "Olympic Size Pool", "Cricket Ground", "2 Clubhouses"],
    verdict: "One of the safest bets in Gurugram. Sobha's backward-integrated construction quality is unmatched, and the project boasts excellent Vastu and open green spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&h=800",
    
    // PRD Fields
    litigationHistory: { status: "clean", detail: "Zero litigation history. Sovereign wealth fund backing." },
    constructionQuality: { status: "excellent", detail: "In-house manufacturing of all components. India's best." },
    priceToValueRatio: { status: "fair", detail: "High entry price justified by unparalleled quality." },
    connectivity: { status: "good", detail: "15 mins to IGI Airport via Dwarka Expressway." },
    reraStatus: { status: "clean", detail: "RERA Approved (On-time delivery track record)" },
    projectedROI: [
      { year: 2024, value: 4.65 },
      { year: 2025, value: 5.15 },
      { year: 2026, value: 5.60 },
      { year: 2027, value: 6.10 },
      { year: 2028, value: 6.65 }
    ],
    // Truth Estate 5-Pillar Score
    confidenceTag: "High",
    subScores: {
      location: 8.0,
      developer: 9.5,
      construction: 9.8,
      legal: 9.5,
      usps: 8.5
    }
  }
];
