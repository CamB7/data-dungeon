CREATE TABLE IF NOT EXISTS "chamber_completions" (
	"user_id" text NOT NULL,
	"chamber_slug" text NOT NULL,
	"xp_awarded" integer DEFAULT 0 NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chamber_completions_user_id_chamber_slug_pk" PRIMARY KEY("user_id","chamber_slug")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "weak_skills" jsonb DEFAULT '{}'::jsonb NOT NULL;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chamber_completions" ADD CONSTRAINT "chamber_completions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
