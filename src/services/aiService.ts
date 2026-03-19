import { GoogleGenAI, Type } from '@google/genai'
import { logger } from '../utils/logger'
import { Skill } from '../types'

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || ''
})

export type ChatHistory = { role: 'user' | 'model'; parts: { text: string }[] }[];

export const chatWithAgent = async (skills: Skill[], history: ChatHistory) => {
    if (!process.env.GEMINI_API_KEY) {
        logger.warn('Gemini API Key missing');
        return { type: 'text', text: 'API Key missing' };
    }

    const availableSkillsStr = skills.map(s => `- ID: ${s.id} | Name: ${s.name} | Category: ${s.category} | Description: ${s.description}`).join('\n');

    const systemInstruction = {
        parts: [{
            text: `You are an expert Relicsa IT consultant and pricing architect.
Your job is to talk to the user and figure out what they want to build. 
Ask brief follow-up questions to clarify platform (Web/iOS/Android), features (Auth, Payments, API, etc.), and complexity.
BE CONCISE. DO NOT ASK MORE THAN 2 QUESTIONS AT ONCE.

Once you clearly understand the project requirements, YOU MUST ALWAYS CALL the 'calculate_price' tool to provide the official estimate.
Here is the available catalog of internal skills to choose from when calling the tool:
${availableSkillsStr}`
        }]
    };

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: history,
            config: {
                systemInstruction: systemInstruction.parts[0].text,
                tools: [{
                    functionDeclarations: [
                        {
                            name: 'calculate_price',
                            description: 'Calls the internal pricing engine. Use this as soon as you have enough information about the project to predict the needed skills.',
                            parameters: {
                                type: Type.OBJECT,
                                properties: {
                                    skills: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING },
                                        description: 'The IDs of the skills mapped from the catalog.'
                                    },
                                    summary: {
                                        type: Type.STRING,
                                        description: 'A 2-3 sentence summary explaining the technical approach.'
                                    }
                                },
                                required: ['skills', 'summary']
                            }
                        }
                    ]
                }]
            }
        });

        if (response.functionCalls && response.functionCalls.length > 0) {
            const call = response.functionCalls[0];
            if (call.name === 'calculate_price') {
                const args = call.args as { skills: string[], summary: string };
                const match = skills.filter(s => (args.skills || []).includes(s.id));
                logger.info(`Agent called calculate_price with ${match.length} skills`);
                return { type: 'estimate', matchedSkills: match, summary: args.summary || 'Summary generated.' };
            }
        }

        return { type: 'text', text: response.text || 'I need more information.' };
    } catch (error) {
        logger.error('Failed to chat with agent', { error });
        throw new Error('Agent chat failed');
    }
}

export const matchSkills = async (skills: Skill[], projectDescription: string): Promise<{ matchedSkills: Skill[], summary: string }> => {
    if (!process.env.GEMINI_API_KEY) {
        logger.warn('Gemini API Key missing');
        return { matchedSkills: [], summary: 'API Key missing' };
    }

    const prompt = `
        You are an expert in pricing for IT services and software development.
        Based on the following skills and project description, generate a detailed pricing report.

        Skills:
        ${skills.map(s => `- ID: ${s.id} | Name: ${s.name} | Category: ${s.category} | Description: ${s.description}`).join('\n')}

        Client Requirement :
        ${projectDescription}

        INSTRUCTIONS:
        1. Select only the skills needed.
        2. Generate a brief 2-3 sentence summary explaining the technical approach and components selected.
        3. Return ONLY a JSON object with keys "skills" (array of IDs) and "summary" (string).
        `;
    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        })

        const parsed = JSON.parse(response.text || '{}') as { skills: string[], summary: string }
        const selectedIds = parsed.skills || []
        const summary = parsed.summary || 'Summary could not be generated.'
        const match = skills.filter(s => selectedIds.includes(s.id))

        return { matchedSkills: match, summary }
    } catch (error) {
        logger.error('Failed to generate pricing report', { error })
        throw new Error('Pricing report generation failed')
    }
}