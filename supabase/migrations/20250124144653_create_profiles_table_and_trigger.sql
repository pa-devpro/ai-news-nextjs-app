-- Create the users table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('ADMIN', 'USER')) NOT NULL DEFAULT 'USER',
  bio TEXT DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create the trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, created_at)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.created_at)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Copy existing users from auth.users to public.profiles (WORKS)
INSERT INTO public.profiles (id, email, name, created_at)
SELECT id, email, raw_user_meta_data->>'full_name', created_at FROM auth.users
ON CONFLICT (id) DO NOTHING;