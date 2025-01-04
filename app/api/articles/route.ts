import { NextResponse } from 'next/server';
import { generateArticle } from '../../../lib/openai-service';

export async function POST(req: any) {
  const { title, subtitle, body } = await req.json();
  const article = await generateArticle({ title, subtitle, body });
  return NextResponse.json({ article });
}