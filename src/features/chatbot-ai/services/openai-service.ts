'use server';

import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { MessageContent } from '@langchain/core/messages';
import logger from '@/utils/logger';
import cache from '@/lib/cache';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
});

interface ArticleContent {
  title: string;
  subtitle: string;
  body: string;
}

export const generateArticle = async ({
  title,
  subtitle,
  body,
}: ArticleContent): Promise<string> => {
  try {
    logger.info('--- Generating New Article (openai-service) --- ');
    const cacheKey = `article-${title}-${subtitle}-${body}`;

    if (cache.has(cacheKey)) {
      logger.info('Cache hit - generateArticle');
      return cache.get(cacheKey) as string;
    }

    const content = `${title} ${subtitle} ${body}`;
    const template = ChatPromptTemplate.fromMessages([
      [
        'system',
        'Answer the users question based on the following context: {context}',
      ],
      ['user', '{input}'],
    ]);

    const chain = template.pipe(model);
    const input = `Create a new article based on the content that express the same idea and same information 
      and present it in a markdown form. Has to be written in an engaging and positive form. 
      At the beggining of the article you will present main points, then you will elaborate on them. 
      At the end of the article you present some takeaways, and ask a question to the user to reflect or
      encourage them to explore further using the chatbox.`;

    const response = await chain.invoke({
      input: input,
      context: content,
    });
    const article = response.content.toString();
    cache.set(cacheKey, article);

    return article;
  } catch (error) {
    logger.error('Error generating article:', error);
    throw new Error('Failed to generate article');
  }
};

// Asks questions to the Ai using the content of the article
export const askQuestionToArticle = async (
  content: string,
  question: string,
): Promise<MessageContent> => {
  try {
    logger.info('--- Asking News Question (openai-service) ---');

    const template = ChatPromptTemplate.fromMessages([
      [
        'system',
        'Answer the users question based on the following context: {context} and return the answer in a markdown format',
      ],
      ['user', '{input}'],
    ]);

    const chain = template.pipe(model);
    const response = await chain.invoke({
      input: question,
      context: content,
    });

    return response.content;
  } catch (error) {
    logger.error('Error asking question to article:', error);
    throw new Error('Failed to ask question to article');
  }
};

// Generate questions based on the content of the article
export const suggestQuestions = async (content: string): Promise<string[]> => {
  try {
    logger.info('--- Suggesting Questions (openai-service) ---');
    const cacheKey = `questions-${content}`;
    if (cache.has(cacheKey)) {
      logger.info('Cache hit - suggestQuestions');
      return cache.get(cacheKey) as string[];
    }
    const template = ChatPromptTemplate.fromMessages([
      [
        'system',
        `Provide me with 3 short interesting questions regarding this content: {context}, make them short and concise, 
        please separate each question with a ;`,
      ],
    ]);
    const chain = template.pipe(model);
    const response = await chain.invoke({
      context: content,
    });

    const questions = response.content.toString().split('\n');

    cache.set(cacheKey, questions);
    return questions;
  } catch (error) {
    logger.error('Error suggesting questions:', error);
    throw new Error('Failed to suggest questions');
  }
};

export const generateAIContent = async (post: ArticleToDisplay) => {
  try {
    const aiContent = await generateArticle({
      title: post.title.toString(),
      subtitle: post.subtitle!,
      body: post.body_raw!,
    });

    const questions = await suggestQuestions(aiContent);
    return { aiContent, questions };
  } catch (error) {
    logger.error('Error getting AI content:', error);
    throw new Error('Failed to get AI content');
  }
};
