import { pgTable, serial, varchar, boolean, timestamp, decimal, integer, text, date, jsonb, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  state: varchar('state', { length: 100 }),
  country: varchar('country', { length: 100 }).default('India'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const microMarkets = pgTable('micro_markets', {
  id: serial('id').primaryKey(),
  cityId: integer('city_id').notNull().references(() => cities.id),
  name: varchar('name', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull(),
  description: text('description'),
  centerLat: decimal('center_lat', { precision: 10, scale: 7 }),
  centerLng: decimal('center_lng', { precision: 10, scale: 7 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sectors = pgTable('sectors', {
  id: serial('id').primaryKey(),
  cityId: integer('city_id').notNull().references(() => cities.id),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  maturityLevel: varchar('maturity_level', { length: 20 }),
});

export const sectorMicroMarket = pgTable('sector_micro_market', {
  sectorId: integer('sector_id').notNull().references(() => sectors.id),
  microMarketId: integer('micro_market_id').notNull().references(() => microMarkets.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.sectorId, t.microMarketId] }),
}));

export const builders = pgTable('builders', {
  id: serial('id').primaryKey(),
  cityId: integer('city_id').references(() => cities.id),
  name: varchar('name', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  tier: varchar('tier', { length: 10 }),
  yearsInBusiness: integer('years_in_business'),
  isListed: boolean('is_listed').default(false),
  totalProjectsNational: integer('total_projects_national'),
  totalProjectsLocal: integer('total_projects_local'),
  reraComplaintsCount: integer('rera_complaints_count').default(0),
  onTimeDeliveryPct: decimal('on_time_delivery_pct', { precision: 5, scale: 2 }),
  preferredContractors: text('preferred_contractors'),
  logoUrl: varchar('logo_url', { length: 500 }),
  description: text('description'),
  dataSource: varchar('data_source', { length: 20 }).default('needs_attention'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  cityId: integer('city_id').references(() => cities.id),
  microMarketId: integer('micro_market_id').references(() => microMarkets.id),
  sectorId: integer('sector_id').references(() => sectors.id),
  builderId: integer('builder_id').references(() => builders.id),
  name: varchar('name', { length: 300 }),
  slug: varchar('slug', { length: 300 }).unique(),
  reraNumber: varchar('rera_number', { length: 100 }),
  category: varchar('category', { length: 30 }),
  status: varchar('status', { length: 25 }),
  launchDate: date('launch_date'),
  reraPossessionDate: date('rera_possession_date'),
  expectedPossessionDate: date('expected_possession_date'),
  landmark: varchar('landmark', { length: 300 }),
  pinCode: varchar('pin_code', { length: 10 }),
  distanceMetroMin: decimal('distance_metro_min', { precision: 5, scale: 1 }),
  distanceHospitalKm: decimal('distance_hospital_km', { precision: 5, scale: 1 }),
  distanceSchoolKm: decimal('distance_school_km', { precision: 5, scale: 1 }),
  distanceArterialRoadKm: decimal('distance_arterial_road_km', { precision: 5, scale: 1 }),
  neighborhoodMaturityScore: decimal('neighborhood_maturity_score', { precision: 3, scale: 1 }),
  basePricePerSqft: decimal('base_price_per_sqft', { precision: 12, scale: 2 }),
  basePricePerSqyd: decimal('base_price_per_sqyd', { precision: 12, scale: 2 }),
  minTicketSize: decimal('min_ticket_size', { precision: 14, scale: 2 }),
  maxTicketSize: decimal('max_ticket_size', { precision: 14, scale: 2 }),
  paymentPlans: text('payment_plans'),
  unitsPerAcre: decimal('units_per_acre', { precision: 6, scale: 1 }),
  openSpacePct: decimal('open_space_pct', { precision: 5, scale: 2 }),
  towerSpacingMeters: decimal('tower_spacing_meters', { precision: 5, scale: 1 }),
  farUtilizationPct: decimal('far_utilization_pct', { precision: 5, scale: 2 }),
  essentialAmenities: jsonb('essential_amenities'),
  lifestyleAmenities: jsonb('lifestyle_amenities'),
  amenitiesDelivered: boolean('amenities_delivered'),
  contractorName: varchar('contractor_name', { length: 200 }),
  constructionProgressPct: decimal('construction_progress_pct', { precision: 5, scale: 2 }),
  monthsAheadBehind: integer('months_ahead_behind'),
  materialQualityNotes: text('material_quality_notes'),
  landTitleStatus: varchar('land_title_status', { length: 20 }),
  tcpStatus: varchar('tcp_status', { length: 200 }),
  pendingCourtCases: integer('pending_court_cases'),
  legalNotes: text('legal_notes'),
  legalDataSource: varchar('legal_data_source', { length: 20 }),
  uspText: varchar('usp_text', { length: 500 }),
  detailedDescription: text('detailed_description'),
  brochureUrl: varchar('brochure_url', { length: 500 }),
  floorPlanUrls: jsonb('floor_plan_urls'),
  sitePlanUrl: varchar('site_plan_url', { length: 500 }),
  galleryImageUrls: jsonb('gallery_image_urls'),
  dataSource: varchar('data_source', { length: 20 }),
  isPublished: boolean('is_published').default(false),
  lastVerifiedDate: date('last_verified_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projectConfigurations = pgTable('project_configurations', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  unitType: varchar('unit_type', { length: 50 }),
  sizeSqft: integer('size_sqft'),
  sizeSqyd: integer('size_sqyd'),
  carpetAreaSqft: integer('carpet_area_sqft'),
  carpetToSuperRatio: decimal('carpet_to_super_ratio', { precision: 4, scale: 3 }),
  price: decimal('price', { precision: 14, scale: 2 }),
  pricePerSqft: decimal('price_per_sqft', { precision: 10, scale: 2 }),
  pricePerSqyd: decimal('price_per_sqyd', { precision: 10, scale: 2 }),
  totalUnits: integer('total_units'),
});

export const scores = pgTable('scores', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).unique(),
  locationScore: decimal('location_score', { precision: 3, scale: 1 }),
  builderScore: decimal('builder_score', { precision: 3, scale: 1 }),
  layoutScore: decimal('layout_score', { precision: 3, scale: 1 }),
  densityScore: decimal('density_score', { precision: 3, scale: 1 }),
  amenitiesScore: decimal('amenities_score', { precision: 3, scale: 1 }),
  legalScore: decimal('legal_score', { precision: 3, scale: 1 }),
  valueForMoneyScore: decimal('value_for_money_score', { precision: 3, scale: 1 }),
  compositeScore: decimal('composite_score', { precision: 3, scale: 1 }),
  hasNeutralValues: boolean('has_neutral_values'),
  neutralPillars: jsonb('neutral_pillars'),
  scoreCalculatedAt: timestamp('score_calculated_at'),
});

export const scoreHistory = pgTable('score_history', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  locationScore: decimal('location_score', { precision: 3, scale: 1 }),
  builderScore: decimal('builder_score', { precision: 3, scale: 1 }),
  layoutScore: decimal('layout_score', { precision: 3, scale: 1 }),
  densityScore: decimal('density_score', { precision: 3, scale: 1 }),
  amenitiesScore: decimal('amenities_score', { precision: 3, scale: 1 }),
  legalScore: decimal('legal_score', { precision: 3, scale: 1 }),
  valueForMoneyScore: decimal('value_for_money_score', { precision: 3, scale: 1 }),
  compositeScore: decimal('composite_score', { precision: 3, scale: 1 }),
  weightsSnapshot: jsonb('weights_snapshot'),
  reason: varchar('reason', { length: 200 }),
  recordedAt: timestamp('recorded_at').defaultNow(),
});

export const scoreWeights = pgTable('score_weights', {
  pillar: varchar('pillar', { length: 50 }).primaryKey(),
  weightPct: integer('weight_pct'),
});

export const neutralSeedValues = pgTable('neutral_seed_values', {
  pillar: varchar('pillar', { length: 50 }).primaryKey(),
  seedValue: decimal('seed_value', { precision: 3, scale: 1 }),
  useRollingAvg: boolean('use_rolling_avg').default(false),
  minVerifiedForRolling: integer('min_verified_for_rolling').default(30),
});

export const areaDevelopments = pgTable('area_developments', {
  id: serial('id').primaryKey(),
  cityId: integer('city_id').references(() => cities.id),
  sectorId: integer('sector_id').references(() => sectors.id),
  microMarketId: integer('micro_market_id').references(() => microMarkets.id),
  developmentType: varchar('development_type', { length: 30 }),
  description: text('description'),
  impactDirection: varchar('impact_direction', { length: 10 }),
  impactNote: varchar('impact_note', { length: 500 }),
  expectedCompletion: date('expected_completion'),
  sourceUrl: varchar('source_url', { length: 500 }),
  dataSource: varchar('data_source', { length: 30 }),
  verified: boolean('verified'),
});

export const developmentImpactBenchmarks = pgTable('development_impact_benchmarks', {
  developmentType: varchar('development_type', { length: 50 }).primaryKey(),
  avgPriceImpactPct: varchar('avg_price_impact_pct', { length: 50 }),
  timeline: varchar('timeline', { length: 100 }),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  builder: one(builders, { fields: [projects.builderId], references: [builders.id] }),
  sector: one(sectors, { fields: [projects.sectorId], references: [sectors.id] }),
  microMarket: one(microMarkets, { fields: [projects.microMarketId], references: [microMarkets.id] }),
  score: one(scores, { fields: [projects.id], references: [scores.projectId] }),
  areaDevelopments: many(areaDevelopments),
}));

export const areaDevelopmentsRelations = relations(areaDevelopments, ({ one }) => ({
  project: one(projects, { fields: [areaDevelopments.sectorId], references: [projects.sectorId] })
}));
