export function calculateLocationScore(
  metroDistMin: number | null,
  arterialRoadDistKm: number | null,
  hospitalDistKm: number | null,
  schoolDistKm: number | null,
  maturityScore: number | null,
  neutralSeed: number
): number {
  // 1a. Connectivity
  let metroScore = neutralSeed;
  if (metroDistMin !== null) {
    if (metroDistMin <= 10) metroScore = 10;
    else if (metroDistMin <= 15) metroScore = 8.5;
    else if (metroDistMin <= 20) metroScore = 7;
    else if (metroDistMin <= 30) metroScore = 5.5;
    else if (metroDistMin <= 45) metroScore = 4;
    else metroScore = 2.5;
  }

  let arterialScore = neutralSeed;
  if (arterialRoadDistKm !== null) {
    if (arterialRoadDistKm <= 0.5) arterialScore = 10;
    else if (arterialRoadDistKm <= 1.0) arterialScore = 8.5;
    else if (arterialRoadDistKm <= 2.0) arterialScore = 7;
    else if (arterialRoadDistKm <= 3.0) arterialScore = 5.5;
    else if (arterialRoadDistKm <= 5.0) arterialScore = 4;
    else arterialScore = 2.5;
  }

  const connectivity = (metroScore + arterialScore) / 2;

  // 1b. Social Infrastructure
  let hospitalScore = neutralSeed;
  if (hospitalDistKm !== null) {
    if (hospitalDistKm <= 2) hospitalScore = 10;
    else if (hospitalDistKm <= 4) hospitalScore = 8;
    else if (hospitalDistKm <= 7) hospitalScore = 6;
    else if (hospitalDistKm <= 10) hospitalScore = 4;
    else hospitalScore = 2;
  }

  let schoolScore = neutralSeed;
  if (schoolDistKm !== null) {
    if (schoolDistKm <= 2) schoolScore = 10;
    else if (schoolDistKm <= 4) schoolScore = 8;
    else if (schoolDistKm <= 6) schoolScore = 6;
    else if (schoolDistKm <= 10) schoolScore = 4;
    else schoolScore = 2;
  }

  const socialInfra = (hospitalScore + schoolScore) / 2;

  // 1c. Neighborhood Maturity
  const maturity = maturityScore !== null ? maturityScore : neutralSeed;

  return (connectivity * 0.333) + (socialInfra * 0.333) + (maturity * 0.334);
}

export function calculateBuilderScore(
  onTimeDeliveryPct: number | null,
  tier: string | null,
  isListed: boolean,
  yearsInBusiness: number | null,
  reraComplaintsCount: number,
  totalProjectsLocal: number,
  contractorName: string | null,
  neutralSeed: number
): number {
  // 2a. Track Record (30%)
  let trackScore = neutralSeed;
  if (onTimeDeliveryPct !== null) {
    if (onTimeDeliveryPct >= 90) trackScore = 10;
    else if (onTimeDeliveryPct >= 80) trackScore = 8;
    else if (onTimeDeliveryPct >= 70) trackScore = 6.5;
    else if (onTimeDeliveryPct >= 60) trackScore = 5;
    else if (onTimeDeliveryPct >= 50) trackScore = 3.5;
    else trackScore = 2;
  }

  // 2b. Legacy & Brand (25%)
  let legacyBase = 4.5; // tier 3 or unknown
  if (tier === 'tier_1') legacyBase = 8.5;
  if (tier === 'tier_2') legacyBase = 6.5;

  let modifiers = 0;
  if (isListed) modifiers += 0.5;
  if (yearsInBusiness !== null) {
    if (yearsInBusiness >= 20) modifiers += 0.5;
    else if (yearsInBusiness >= 10) modifiers += 0.25;
  }
  const legacyScore = Math.min(10, legacyBase + modifiers);

  // 2c. RERA Compliance (25%)
  const maxLocal = Math.max(totalProjectsLocal || 1, 1);
  const complaintRatio = reraComplaintsCount / maxLocal;
  let reraScore = 10;
  if (complaintRatio > 0.30) reraScore = 2;
  else if (complaintRatio > 0.15) reraScore = 4;
  else if (complaintRatio > 0.05) reraScore = 6;
  else if (complaintRatio > 0) reraScore = 8;

  // 2d. Contractor Quality (20%)
  let contractorScore = neutralSeed;
  if (contractorName) {
    const lContractor = contractorName.toLowerCase();
    if (['l&t', 'shapoorji pallonji', 'tata projects'].includes(lContractor)) {
      contractorScore = 10;
    } else {
      // Very basic placeholder. In real app, we might need a contractor_tier table
      contractorScore = 8; // Assuming recognized if recorded, or 6 if regional.
    }
  }

  return (trackScore * 0.30) + (legacyScore * 0.25) + (reraScore * 0.25) + (contractorScore * 0.20);
}

export function calculateDensityScore(
  unitsPerAcre: number | null,
  openSpacePct: number | null,
  towerSpacingMeters: number | null,
  neutralSeed: number
): number {
  let unitsScore = neutralSeed;
  if (unitsPerAcre !== null) {
    if (unitsPerAcre <= 20) unitsScore = 10;
    else if (unitsPerAcre <= 35) unitsScore = 8;
    else if (unitsPerAcre <= 50) unitsScore = 6;
    else if (unitsPerAcre <= 70) unitsScore = 4.5;
    else if (unitsPerAcre <= 100) unitsScore = 3;
    else unitsScore = 1.5;
  }

  let openScore = neutralSeed;
  if (openSpacePct !== null) {
    if (openSpacePct >= 75) openScore = 10;
    else if (openSpacePct >= 60) openScore = 8;
    else if (openSpacePct >= 45) openScore = 6.5;
    else if (openSpacePct >= 30) openScore = 5;
    else if (openSpacePct >= 15) openScore = 3;
    else openScore = 1.5;
  }

  let spacingScore = neutralSeed;
  if (towerSpacingMeters !== null) {
    if (towerSpacingMeters >= 40) spacingScore = 10;
    else if (towerSpacingMeters >= 30) spacingScore = 8;
    else if (towerSpacingMeters >= 20) spacingScore = 6;
    else if (towerSpacingMeters >= 15) spacingScore = 4;
    else spacingScore = 2;
  }

  return (unitsScore * 0.40) + (openScore * 0.30) + (spacingScore * 0.30);
}

export function calculateAmenitiesScore(
  essentialAmenities: string[] | null,
  lifestyleAmenities: string[] | null,
  amenitiesDelivered: boolean,
  neutralSeed: number
): number {
  if (!essentialAmenities || !lifestyleAmenities) return neutralSeed;

  const essentialRatio = essentialAmenities.length / 7;
  const essentialScore = essentialRatio * 10;

  const lifestyleRatio = lifestyleAmenities.length / 8;
  const deliveryModifier = amenitiesDelivered ? 1.0 : 0.7;
  const lifestyleScore = lifestyleRatio * 10 * deliveryModifier;

  return (essentialScore * 0.60) + (lifestyleScore * 0.40);
}

export function calculateLegalScore(
  landTitleStatus: string | null,
  pendingCourtCases: number,
  legalDataSource: string | null,
  neutralSeed: number
): number {
  if (legalDataSource === 'not_found' || !landTitleStatus || landTitleStatus === 'data_not_found') {
    return neutralSeed;
  }

  let baseScore = 0;
  if (landTitleStatus === 'clear') baseScore = 9;
  else if (landTitleStatus === 'disputed') baseScore = 3;
  else if (landTitleStatus === 'under_litigation') baseScore = 1.5;

  let modifiers = 0;
  if (landTitleStatus === 'clear' && pendingCourtCases === 0) {
    modifiers += 1;
  }
  modifiers -= pendingCourtCases; // -1 for each pending case
  
  if (legalDataSource === 'third_party') {
    modifiers -= 0.5;
  }

  const finalScore = Math.min(10, Math.max(1, baseScore + modifiers));
  return finalScore;
}

export function calculateValueForMoneyScore(
  projectBsp: number | null,
  microMarketAvgBsp: number | null,
  neutralSeed: number
): number {
  if (!projectBsp || !microMarketAvgBsp) return neutralSeed;

  const ratio = projectBsp / microMarketAvgBsp;
  if (ratio <= 0.80) return 9.5;
  if (ratio <= 0.90) return 8;
  if (ratio <= 1.05) return 6.5;
  if (ratio <= 1.15) return 5;
  if (ratio <= 1.30) return 3.5;
  return 2;
}

export function getScoreBand(score: number): { band: string, color: string, label: string } {
  if (score >= 8.5) return { band: 'Excellent', color: '#1E8449', label: 'Strong buy consideration' };
  if (score >= 7.0) return { band: 'Good', color: '#2E86C1', label: 'Worth serious evaluation' };
  if (score >= 5.5) return { band: 'Average', color: '#D4AC0D', label: 'Proceed with caution' };
  return { band: 'Weak', color: '#C0392B', label: 'Significant concerns' };
}
