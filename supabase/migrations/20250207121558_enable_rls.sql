-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own saved articles" ON saved_articles;
DROP POLICY IF EXISTS "Users can insert own saved articles" ON saved_articles;
DROP POLICY IF EXISTS "Users can update own saved articles" ON saved_articles;
DROP POLICY IF EXISTS "Users can delete own saved articles" ON saved_articles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone." 
ON profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile." 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Enable RLS on saved_articles table
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;

-- Saved articles policies
CREATE POLICY "Users can view own saved articles" 
ON saved_articles FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own saved articles" 
ON saved_articles FOR INSERT 
WITH CHECK (auth.uid()::text = COALESCE(user_id::text, auth.uid()::text));

CREATE POLICY "Users can update own saved articles" 
ON saved_articles FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own saved articles" 
ON saved_articles FOR DELETE 
USING (auth.uid()::text = user_id::text);