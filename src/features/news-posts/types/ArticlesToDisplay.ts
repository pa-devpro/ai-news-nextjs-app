/** A unified shape for both "Post" and "SavedArticle" */
export interface ArticleToDisplay {
  id?: number;
  user_id?: string;
  created_at: string;
  title: string;
  subtitle?: string | null;
  featured_image?: string | null;
  author?: string | null;
  date?: string | null;
  body_raw?: string | null;
  topics: string[];
  urlsegment: string;
  original_url: string | null;
  generated_ai_content: string | null;
  questions_and_answers: QuestionAndAnswer[];
}

export type QuestionAndAnswer = { question: string; answer: string };
