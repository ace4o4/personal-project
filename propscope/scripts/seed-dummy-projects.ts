import { db } from '../src/lib/db';
import * as schema from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  console.log("Seeding Dummy Projects...");
  
  // 1. Get micro markets and city
  const city = await db.query.cities.findFirst();
  const dwarkaExp = await db.query.microMarkets.findFirst({
    where: eq(schema.microMarkets.slug, 'dwarka-expressway')
  });
  
  if (!city || !dwarkaExp) {
    console.log("Master data missing, please run seed-master-data.ts first.");
    process.exit(1);
  }

  // 2. Create Builder
  const [builder] = await db.insert(schema.builders).values({
    cityId: city.id,
    name: 'M3M India',
    slug: 'm3m-india',
    tier: 'tier_1',
    yearsInBusiness: 15,
    isListed: false,
    totalProjectsLocal: 40,
    reraComplaintsCount: 5,
    onTimeDeliveryPct: "85.00",
    dataSource: 'primary'
  }).returning();

  // 3. Create Sector
  const [sector] = await db.insert(schema.sectors).values({
    cityId: city.id,
    name: 'Sector 113',
    slug: 'sector-113',
    maturityLevel: 'developing'
  }).returning();

  // 4. Create Project
  const [project] = await db.insert(schema.projects).values({
    cityId: city.id,
    microMarketId: dwarkaExp.id,
    sectorId: sector.id,
    builderId: builder.id,
    name: 'M3M Capital',
    slug: 'm3m-capital-113',
    reraNumber: 'RC/REP/HARERA/GGM/531/263/2022/06',
    category: 'high_rise_normal',
    status: 'under_construction',
    launchDate: '2022-02-01',
    expectedPossessionDate: '2026-12-31',
    distanceMetroMin: "10.0",
    distanceHospitalKm: "4.5",
    distanceSchoolKm: "2.5",
    distanceArterialRoadKm: "0.1",
    neighborhoodMaturityScore: "6.5",
    basePricePerSqft: "16500.00",
    minTicketSize: "21500000.00",
    maxTicketSize: "45000000.00",
    unitsPerAcre: "45.0",
    openSpacePct: "70.00",
    towerSpacingMeters: "35.0",
    essentialAmenities: ['power_backup', 'water_supply', 'security_system', 'elevator'],
    lifestyleAmenities: ['clubhouse', 'swimming_pool', 'gym', 'sports_courts'],
    amenitiesDelivered: false,
    contractorName: 'Tata Projects',
    constructionProgressPct: "40.00",
    landTitleStatus: 'clear',
    pendingCourtCases: 0,
    legalDataSource: 'government',
    uspText: 'Luxury golf-themed residences on Dwarka Expressway',
    detailedDescription: 'M3M Capital offers luxury golf-styled living on Dwarka Expressway with huge open spaces and premium amenities.',
    dataSource: 'primary',
    isPublished: true,
    galleryImageUrls: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80']
  }).returning();

  // 5. Calculate Score for this project
  await db.insert(schema.scores).values({
    projectId: project.id,
    locationScore: "8.5",
    builderScore: "7.8",
    layoutScore: "8.0",
    densityScore: "6.5",
    amenitiesScore: "7.5",
    legalScore: "9.5",
    valueForMoneyScore: "6.0",
    compositeScore: "7.8",
    hasNeutralValues: false,
    neutralPillars: [],
    scoreCalculatedAt: new Date()
  });

  // 6. Create Area Momentum
  await db.insert(schema.areaDevelopments).values({
    cityId: city.id,
    sectorId: sector.id,
    microMarketId: dwarkaExp.id,
    developmentType: 'metro_extension',
    description: 'Yellow Line extension to Dwarka Expressway Sector 111-113',
    impactDirection: 'positive',
    impactNote: 'Will drastically improve connectivity to Delhi',
    expectedCompletion: '2027-12-31',
    dataSource: 'government_gazette',
    verified: true
  });

  console.log("Dummy Project Inserted!");
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
