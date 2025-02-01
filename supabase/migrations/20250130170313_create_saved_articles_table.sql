-- Create saved_articles table
CREATE TABLE IF NOT EXISTS public.saved_articles (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    date DATE NOT NULL,
    featured_image VARCHAR(255),
    topics TEXT[],
    author VARCHAR(100),
    body_raw TEXT,
    urlsegment VARCHAR(255),
    original_url VARCHAR(255),
    generated_ai_content TEXT,
    questions_and_answers JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
);