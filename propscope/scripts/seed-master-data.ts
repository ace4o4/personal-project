import { db } from '../src/lib/db';
import * as schema from '../src/lib/db/schema';

async function main() {
  console.log("Seeding Master Data...");

  // 1. City: Gurgaon
  const [gurgaon] = await db.insert(schema.cities).values({
    name: 'Gurugram',
    slug: 'gurugram',
    state: 'Haryana',
    country: 'India',
  }).returning();
  console.log("Inserted City:", gurgaon.name);

  // 2. Micro Markets (From Section 10.1 of plan.txt)
  const marketsToInsert = [
    { name: 'Dwarka Expressway', slug: 'dwarka-expressway' },
    { name: 'New Gurgaon', slug: 'new-gurgaon' },
    { name: 'Golf Course Extension', slug: 'golf-course-extension' },
    { name: 'SPR', slug: 'spr' },
    { name: 'Sohna Road', slug: 'sohna-road' },
    { name: 'NH-8 / Delhi-Jaipur', slug: 'nh-8' },
    { name: 'MG Road / DLF I-V', slug: 'mg-road' },
    { name: 'Golf Course Road', slug: 'golf-course-road' },
    { name: 'Old Gurgaon', slug: 'old-gurgaon' },
    { name: 'KMP Expressway', slug: 'kmp-expressway' },
  ];

  for (const m of marketsToInsert) {
    await db.insert(schema.microMarkets).values({
      cityId: gurgaon.id,
      name: m.name,
      slug: m.slug,
    });
  }
  console.log("Inserted Micro Markets.");

  // 3. Score Weights (Section 6.9)
  const weights = [
    { pillar: 'location', weightPct: 25 },
    { pillar: 'builder', weightPct: 20 },
    { pillar: 'layout', weightPct: 18 },
    { pillar: 'density', weightPct: 12 },
    { pillar: 'amenities', weightPct: 10 },
    { pillar: 'legal', weightPct: 10 },
    { pillar: 'value_for_money', weightPct: 5 },
  ];
  for (const w of weights) {
    await db.insert(schema.scoreWeights).values(w);
  }
  console.log("Inserted Score Weights.");

  // 4. Neutral Seed Values (Section 6.10)
  const neutralValues = [
    { pillar: 'location', seedValue: '6.0' },
    { pillar: 'builder', seedValue: '6.5' },
    { pillar: 'layout', seedValue: '6.0' },
    { pillar: 'density', seedValue: '6.0' },
    { pillar: 'amenities', seedValue: '5.5' },
    { pillar: 'legal', seedValue: '7.0' },
    { pillar: 'value_for_money', seedValue: '6.0' },
  ];
  for (const nv of neutralValues) {
    await db.insert(schema.neutralSeedValues).values(nv);
  }
  console.log("Inserted Neutral Seed Values.");

  // 5. Impact Benchmarks (Section 6.12)
  const benchmarks = [
    { developmentType: 'metro_extension', avgPriceImpactPct: '+30-60%', timeline: '2-4 years post-completion' },
    { developmentType: 'road_widening', avgPriceImpactPct: '+15-25%', timeline: '1-2 years post-completion' },
    { developmentType: 'hospital', avgPriceImpactPct: '+10-20%', timeline: '1-3 years' },
    { developmentType: 'school', avgPriceImpactPct: '+5-15%', timeline: '1-2 years' },
    { developmentType: 'commercial_hub', avgPriceImpactPct: '+20-40%', timeline: '2-5 years' },
    { developmentType: 'flyover', avgPriceImpactPct: '+10-20%', timeline: '1-2 years post-completion' },
    { developmentType: 'signal_free_corridor', avgPriceImpactPct: '+15-25%', timeline: '1-3 years' },
  ];
  for (const b of benchmarks) {
    await db.insert(schema.developmentImpactBenchmarks).values(b);
  }
  console.log("Inserted Development Benchmarks.");

  console.log("Seed complete!");
  process.exit(0);
}

main().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
