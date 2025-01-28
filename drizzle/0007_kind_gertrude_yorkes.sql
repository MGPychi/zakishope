ALTER TABLE "products" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "discount" integer DEFAULT 0;