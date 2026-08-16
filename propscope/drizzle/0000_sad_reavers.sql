CREATE TABLE "area_developments" (
	"id" serial PRIMARY KEY NOT NULL,
	"city_id" integer,
	"sector_id" integer,
	"micro_market_id" integer,
	"development_type" varchar(30),
	"description" text,
	"impact_direction" varchar(10),
	"impact_note" varchar(500),
	"expected_completion" date,
	"source_url" varchar(500),
	"data_source" varchar(30),
	"verified" boolean
);
--> statement-breakpoint
CREATE TABLE "builders" (
	"id" serial PRIMARY KEY NOT NULL,
	"city_id" integer,
	"name" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"tier" varchar(10),
	"years_in_business" integer,
	"is_listed" boolean DEFAULT false,
	"total_projects_national" integer,
	"total_projects_local" integer,
	"rera_complaints_count" integer DEFAULT 0,
	"on_time_delivery_pct" numeric(5, 2),
	"preferred_contractors" text,
	"logo_url" varchar(500),
	"description" text,
	"data_source" varchar(20) DEFAULT 'needs_attention',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "builders_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"state" varchar(100),
	"country" varchar(100) DEFAULT 'India',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "cities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "development_impact_benchmarks" (
	"development_type" varchar(50) PRIMARY KEY NOT NULL,
	"avg_price_impact_pct" varchar(50),
	"timeline" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "micro_markets" (
	"id" serial PRIMARY KEY NOT NULL,
	"city_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"description" text,
	"center_lat" numeric(10, 7),
	"center_lng" numeric(10, 7),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "neutral_seed_values" (
	"pillar" varchar(50) PRIMARY KEY NOT NULL,
	"seed_value" numeric(3, 1),
	"use_rolling_avg" boolean DEFAULT false,
	"min_verified_for_rolling" integer DEFAULT 30
);
--> statement-breakpoint
CREATE TABLE "project_configurations" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"unit_type" varchar(50),
	"size_sqft" integer,
	"size_sqyd" integer,
	"carpet_area_sqft" integer,
	"carpet_to_super_ratio" numeric(4, 3),
	"price" numeric(14, 2),
	"price_per_sqft" numeric(10, 2),
	"price_per_sqyd" numeric(10, 2),
	"total_units" integer
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"city_id" integer,
	"micro_market_id" integer,
	"sector_id" integer,
	"builder_id" integer,
	"name" varchar(300),
	"slug" varchar(300),
	"rera_number" varchar(100),
	"category" varchar(30),
	"status" varchar(25),
	"launch_date" date,
	"rera_possession_date" date,
	"expected_possession_date" date,
	"landmark" varchar(300),
	"pin_code" varchar(10),
	"distance_metro_min" numeric(5, 1),
	"distance_hospital_km" numeric(5, 1),
	"distance_school_km" numeric(5, 1),
	"distance_arterial_road_km" numeric(5, 1),
	"neighborhood_maturity_score" numeric(3, 1),
	"base_price_per_sqft" numeric(12, 2),
	"base_price_per_sqyd" numeric(12, 2),
	"min_ticket_size" numeric(14, 2),
	"max_ticket_size" numeric(14, 2),
	"payment_plans" text,
	"units_per_acre" numeric(6, 1),
	"open_space_pct" numeric(5, 2),
	"tower_spacing_meters" numeric(5, 1),
	"far_utilization_pct" numeric(5, 2),
	"essential_amenities" jsonb,
	"lifestyle_amenities" jsonb,
	"amenities_delivered" boolean,
	"contractor_name" varchar(200),
	"construction_progress_pct" numeric(5, 2),
	"months_ahead_behind" integer,
	"material_quality_notes" text,
	"land_title_status" varchar(20),
	"tcp_status" varchar(200),
	"pending_court_cases" integer,
	"legal_notes" text,
	"legal_data_source" varchar(20),
	"usp_text" varchar(500),
	"detailed_description" text,
	"brochure_url" varchar(500),
	"floor_plan_urls" jsonb,
	"site_plan_url" varchar(500),
	"gallery_image_urls" jsonb,
	"data_source" varchar(20),
	"is_published" boolean DEFAULT false,
	"last_verified_date" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "score_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"location_score" numeric(3, 1),
	"builder_score" numeric(3, 1),
	"layout_score" numeric(3, 1),
	"density_score" numeric(3, 1),
	"amenities_score" numeric(3, 1),
	"legal_score" numeric(3, 1),
	"value_for_money_score" numeric(3, 1),
	"composite_score" numeric(3, 1),
	"weights_snapshot" jsonb,
	"reason" varchar(200),
	"recorded_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "score_weights" (
	"pillar" varchar(50) PRIMARY KEY NOT NULL,
	"weight_pct" integer
);
--> statement-breakpoint
CREATE TABLE "scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"location_score" numeric(3, 1),
	"builder_score" numeric(3, 1),
	"layout_score" numeric(3, 1),
	"density_score" numeric(3, 1),
	"amenities_score" numeric(3, 1),
	"legal_score" numeric(3, 1),
	"value_for_money_score" numeric(3, 1),
	"composite_score" numeric(3, 1),
	"has_neutral_values" boolean,
	"neutral_pillars" jsonb,
	"score_calculated_at" timestamp,
	CONSTRAINT "scores_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
CREATE TABLE "sector_micro_market" (
	"sector_id" integer NOT NULL,
	"micro_market_id" integer NOT NULL,
	CONSTRAINT "sector_micro_market_sector_id_micro_market_id_pk" PRIMARY KEY("sector_id","micro_market_id")
);
--> statement-breakpoint
CREATE TABLE "sectors" (
	"id" serial PRIMARY KEY NOT NULL,
	"city_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"maturity_level" varchar(20)
);
--> statement-breakpoint
ALTER TABLE "area_developments" ADD CONSTRAINT "area_developments_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "area_developments" ADD CONSTRAINT "area_developments_sector_id_sectors_id_fk" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "area_developments" ADD CONSTRAINT "area_developments_micro_market_id_micro_markets_id_fk" FOREIGN KEY ("micro_market_id") REFERENCES "public"."micro_markets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "builders" ADD CONSTRAINT "builders_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "micro_markets" ADD CONSTRAINT "micro_markets_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_configurations" ADD CONSTRAINT "project_configurations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_micro_market_id_micro_markets_id_fk" FOREIGN KEY ("micro_market_id") REFERENCES "public"."micro_markets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_sector_id_sectors_id_fk" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_builder_id_builders_id_fk" FOREIGN KEY ("builder_id") REFERENCES "public"."builders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "score_history" ADD CONSTRAINT "score_history_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scores" ADD CONSTRAINT "scores_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sector_micro_market" ADD CONSTRAINT "sector_micro_market_sector_id_sectors_id_fk" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sector_micro_market" ADD CONSTRAINT "sector_micro_market_micro_market_id_micro_markets_id_fk" FOREIGN KEY ("micro_market_id") REFERENCES "public"."micro_markets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sectors" ADD CONSTRAINT "sectors_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;