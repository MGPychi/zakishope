ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "first_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "last_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "phone" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "wilaya" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "user_id";