CREATE TYPE "public"."appintment_status" AS ENUM('created', 'completed', 'cancelled', 'no_show', 'rescheduled');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'barber');--> statement-breakpoint
CREATE TABLE "appointments" (
	"barbershop_id" text NOT NULL,
	"barber_id" text NOT NULL,
	"service_id" text NOT NULL,
	"customer_id" text NOT NULL,
	"appointment_date" timestamp NOT NULL,
	"status" "appintment_status" DEFAULT 'created' NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "barbers" (
	"subscription_start_date" timestamp,
	"subscription_end_date" timestamp,
	"user_id" text NOT NULL,
	"barbershop_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "barbershops" (
	"name" text NOT NULL,
	"address" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"phone" text NOT NULL,
	"availability" jsonb NOT NULL,
	"logo_url" text,
	"social_media" jsonb,
	"owner_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"name" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"duration" integer NOT NULL,
	"barbershop_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "passkey" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"public_key" text NOT NULL,
	"user_id" text NOT NULL,
	"credential_id" text NOT NULL,
	"counter" integer NOT NULL,
	"device_type" text NOT NULL,
	"backed_up" boolean NOT NULL,
	"transports" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "two_factor" (
	"id" text PRIMARY KEY NOT NULL,
	"secret" text NOT NULL,
	"backup_codes" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"two_factor_enabled" boolean DEFAULT false,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barber_id_barbers_id_fk" FOREIGN KEY ("barber_id") REFERENCES "public"."barbers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customer_id_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barbers" ADD CONSTRAINT "barbers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barbers" ADD CONSTRAINT "barbers_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barbershops" ADD CONSTRAINT "barbershops_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "two_factor" ADD CONSTRAINT "two_factor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "appointments_barbershopId_idx" ON "appointments" USING btree ("barbershop_id");--> statement-breakpoint
CREATE INDEX "appointments_barberId_idx" ON "appointments" USING btree ("barber_id");--> statement-breakpoint
CREATE INDEX "appointments_serviceId_idx" ON "appointments" USING btree ("service_id");--> statement-breakpoint
CREATE INDEX "appointments_customerId_idx" ON "appointments" USING btree ("customer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "appointments_uuid_idx" ON "appointments" USING btree ("uuid");--> statement-breakpoint
CREATE UNIQUE INDEX "barbers_uuid_idx" ON "barbers" USING btree ("uuid");--> statement-breakpoint
CREATE INDEX "barbershops_ownerId_idx" ON "barbershops" USING btree ("owner_id");--> statement-breakpoint
CREATE UNIQUE INDEX "barbershops_uuid_idx" ON "barbershops" USING btree ("uuid");--> statement-breakpoint
CREATE UNIQUE INDEX "services_uuid_idx" ON "services" USING btree ("uuid");