-- Sync Neon Auth users into public.users for app-owned player data.
CREATE OR REPLACE FUNCTION public.sync_user_from_neon_auth()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.users WHERE id = OLD.id::text;
    RETURN OLD;
  END IF;

  INSERT INTO public.users (id, email, display_name, image, created_at, updated_at)
  VALUES (
    NEW.id::text,
    NEW.email,
    COALESCE(NULLIF(NEW.name, ''), split_part(NEW.email, '@', 1)),
    NEW.image,
    NEW."createdAt",
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = EXCLUDED.display_name,
    image = EXCLUDED.image,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint

DROP TRIGGER IF EXISTS sync_user_from_neon_auth_trigger ON neon_auth."user";
--> statement-breakpoint

CREATE TRIGGER sync_user_from_neon_auth_trigger
AFTER INSERT OR UPDATE OR DELETE ON neon_auth."user"
FOR EACH ROW EXECUTE FUNCTION public.sync_user_from_neon_auth();
--> statement-breakpoint

GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO neon_auth;
