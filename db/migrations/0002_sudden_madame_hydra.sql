ALTER TABLE "lists" ADD COLUMN "user_id" text;--> statement-breakpoint
UPDATE "lists" SET "user_id" = (SELECT "id" FROM "user" LIMIT 1);--> statement-breakpoint
ALTER TABLE "lists" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "lists" ADD CONSTRAINT "lists_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
