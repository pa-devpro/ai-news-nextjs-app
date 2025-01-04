'use server'
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { MessageContent } from "@langchain/core/messages";
import { Post } from '@/domain/posts/entities/Post';
import logger from "@/lib/logger";
import cache  from './cache';

const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
});

interface ArticleContent {
    title: string;
    subtitle: string;
    body: string;
}

export const generateArticle = async ({ title, subtitle, body }: ArticleContent) => {
    logger.info("--- Generating New Article (openai-service) --- ")
    const cacheKey = `article-${title}-${subtitle}-${body}`;

    if(cache.has(cacheKey)) {
        logger.info('Cache hit - generateArticle');
        return cache.get(cacheKey);
    }

    const content = `${title} ${subtitle} ${body}`;
    const template = ChatPromptTemplate.fromMessages([
        ['system', 'Answer the users question based on the following context: {context}'],
        ['user', '{input}']
    ]);

    const chain = template.pipe(model);
    const input = 'Create a new article based on the content that express the same idea and same information and present it in a markdown form. Has to be written in an engaging and positive form';
    const response = await chain.invoke({
        input: input,
        context: content
    });
    const article = response.content.toString();
    
    cache.set(cacheKey, article);
    return article
}

export const askQuestionToArticle = async (content: string, question: string): Promise<MessageContent> => {
    logger.info("--- Asking News Question (openai-service) ---")
    
    const template = ChatPromptTemplate.fromMessages([
        ['system', 'Answer the users question based on the following context: {context} and return the answer in a markdown format'],
        ['user', '{input}']
    ]);

    const chain = template.pipe(model);
    const response = await chain.invoke({
        input: question,
        context: content
    });

    return response.content
}

export const suggestQuestions =  async (content: string) => {
    logger.info("--- Suggesting Questions (openai-service) ---")
    const cacheKey = `questions-${content}`;
    if(cache.has(cacheKey)) {
        logger.info('Cache hit - suggestQuestions');
        return cache.get(cacheKey);
    }
    const template = ChatPromptTemplate.fromMessages([
        ['system', 'Provide me with 3 interesting questions regarding this content: {context}, please separate each question with a ;']    
    ]);
    const chain = template.pipe(model);
    const response = await chain.invoke({
        context: content
    });

    const questions = response.content.toString().split('\n')
    
    cache.set(cacheKey, questions);
    return questions
}

export const getAIContent = async(post: Post) => {
    logger.info('🔴 Generating AI content');

    const aiContent = post ? await generateArticle({ title: post.title.toString(), subtitle: post.subtitle, body: post.body.raw }) : null;
    const questions = aiContent ? await suggestQuestions(aiContent) : [];
    
    return { aiContent, questions };
}
