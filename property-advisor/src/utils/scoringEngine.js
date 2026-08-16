import { properties } from '../data/mockProperties';

export const calculateMatches = (preferences) => {
  const { budget, timeline, vastu, riskTolerance } = preferences;

  const scoredProperties = properties.map(property => {
    let score = 0;
    const maxScore = 40; 
    let matchFactors = [];

    // 1. Budget Score
    if (budget >= property.priceCr) {
      score += 10;
      matchFactors.push({ factor: 'Budget', matched: true, text: 'Within limits' });
    } else if (budget >= property.priceCr * 0.8) {
      score += 5;
      matchFactors.push({ factor: 'Budget', matched: false, text: 'Slight stretch' });
    } else {
      matchFactors.push({ factor: 'Budget', matched: false, text: 'Exceeds budget' });
    }

    // 2. Timeline Score
    const isReady = property.possession === 'Ready to Move';
    if (timeline === 'immediate') {
      if (isReady) {
        score += 10;
        matchFactors.push({ factor: 'Timeline', matched: true, text: 'Ready to Move' });
      } else {
        score += 3;
        matchFactors.push({ factor: 'Timeline', matched: false, text: `Handover ${property.possession}` });
      }
    } else {
      score += 10;
      matchFactors.push({ factor: 'Timeline', matched: true, text: `Handover ${property.possession}` });
    }

    // 3. Vastu Score
    if (vastu === 'high') {
      score += property.vastuScore;
      matchFactors.push({ factor: 'Vastu', matched: property.vastuScore >= 8, text: `${property.vastuScore}/10 Score` });
    } else {
      score += 10;
      matchFactors.push({ factor: 'Vastu', matched: true, text: 'Flexible' });
    }

    // 4. Risk Tolerance
    if (riskTolerance === 'low') {
      score += property.riskScore;
      matchFactors.push({ factor: 'Risk', matched: property.riskScore >= 8, text: `Tier 1 Developer` });
    } else {
      score += 10;
      matchFactors.push({ factor: 'Risk', matched: true, text: 'Acceptable Risk' });
    }

    const percentage = Math.round((score / maxScore) * 100);

    return {
      ...property,
      matchScore: percentage,
      matchFactors
    };
  });

  return scoredProperties.sort((a, b) => b.matchScore - a.matchScore);
};

export const calculateTruthScore = (property) => {
  if (!property.subScores) return { score: 0, percentile: 0 };

  const { location, developer, construction, legal, usps } = property.subScores;
  
  // Weights from PRD
  const weightedSum = 
    (location * 0.26) + 
    (developer * 0.25) + 
    (construction * 0.22) + 
    (legal * 0.15) + 
    (usps * 0.12);

  // Convert out of 10 to out of 100
  const score = Math.round(weightedSum * 10);

  // Mock percentile based on the score to simulate a database of 100s of projects
  let percentile = 0;
  if (score >= 95) percentile = 99;
  else if (score >= 90) percentile = 92;
  else if (score >= 85) percentile = 84;
  else if (score >= 80) percentile = 72;
  else if (score >= 70) percentile = 45;
  else percentile = 20;

  return {
    score,
    percentile,
    confidenceTag: property.confidenceTag || "Medium",
    subScores: property.subScores
  };
};
