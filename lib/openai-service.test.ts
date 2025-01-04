import { askQuestionToArticle, generateArticle, suggestQuestions } from './openai-service';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

jest.mock('@/lib/logger', () => ({
    info: jest.fn(),
}));

jest.mock('@langchain/openai', () => ({
    ChatOpenAI: jest.fn().mockImplementation(() => ({
        invoke: jest.fn().mockResolvedValue({
            text: 'Generated article content',
        }),
    })),
}));

jest.mock('@langchain/core/prompts', () => ({
    ChatPromptTemplate: {
        fromMessages: jest.fn().mockReturnValue({
            pipe: jest.fn().mockReturnValue({
                invoke: jest.fn().mockResolvedValue({
                    content: 'Generated article content',
                }),
            }),
        }),
    },
}));

describe('generateArticle', () => {
    it('should generate a new article based on the provided content', async () => {
        const articleContent = {
            title: 'Sample Title',
            subtitle: 'Sample Subtitle',
            body: 'Sample Body',
        };

        const result = await generateArticle(articleContent);

        expect(result).toEqual('Generated article content');
        expect(ChatOpenAI).toHaveBeenCalledWith({
            modelName: 'gpt-3.5-turbo',
            temperature: 0.7,
        });
        expect(ChatPromptTemplate.fromMessages).toHaveBeenCalledWith([
            ['system', 'Answer the users question based on the following context: {context}'],
            ['user', '{input}'],
        ]);
    });
});

describe('askQuestionToArticle', () => {
    it('should ask a question to the provided article content', async () => {
        const content = 'Sample article content';
        const question = 'Sample question';

        const result = await askQuestionToArticle(content, question);

        expect(result).toEqual('Generated article content');
        expect(ChatPromptTemplate.fromMessages).toHaveBeenCalledWith([
            ['system', 'Answer the users question based on the following context: {context} and return the answer in a markdown format'],
            ['user', '{input}'],
        ]);
    });
});

describe('suggestQuestions', () => {
    it('should suggest questions based on the provided content', async () => {
        const content = 'Sample article content';

        const result = await suggestQuestions(content);

        expect(result).toEqual(['Generated article content']);
        expect(ChatPromptTemplate.fromMessages).toHaveBeenCalledWith([
            ['system', 'Provide me with 3 interesting questions regarding this content: {context}, please separate each question with a ;'],
        ]);
    });
});