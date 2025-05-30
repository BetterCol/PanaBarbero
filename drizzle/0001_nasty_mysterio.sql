ALTER TABLE "appointments" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "status" SET DEFAULT 'created'::text;--> statement-breakpoint
DROP TYPE "public"."appintment_status";--> statement-breakpoint
CREATE TYPE "public"."appintment_status" AS ENUM('created', 'completed', 'cancelled', 'no_show', 'rescheduled');--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "status" SET DEFAULT 'created'::"public"."appintment_status";--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "status" SET DATA TYPE "public"."appintment_status" USING "status"::"public"."appintment_status";