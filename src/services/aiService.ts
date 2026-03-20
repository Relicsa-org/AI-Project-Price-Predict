import { GoogleGenAI, Type } from '@google/genai'
import { logger } from '../utils/logger'
import { Skill, MatchedSkill } from '../types'

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || ''
})

export type ChatHistory = { role: 'user' | 'model'; parts: { text: string }[] }[];

export const chatWithAgent = async (skills: Skill[], history: ChatHistory): Promise<{ type: string, text?: string, options?: string[], matchedSkills?: MatchedSkill[], summary?: string }> => {
    if (!process.env.GEMINI_API_KEY) {
        logger.warn('Gemini API Key missing');
        return { type: 'text', text: 'API Key missing' };
    }

    const availableSkillsStr = skills.map(s => `- ID: ${s.id} | Name: ${s.name} | Category: ${s.category} | Description: ${s.description}`).join('\n');

    const systemInstruction = {
        parts: [{
            text: `You are an expert Relicsa IT consultant and pricing architect.
BE CONCISE. DO NOT ASK MORE THAN 2 QUESTIONS AT ONCE.

Once you clearly understand the project requirements, YOU MUST ALWAYS CALL the 'calculate_price' tool to provide the official estimate.

CRITICAL AI PERSONA RULES - HOW TO HANDLE FOLLOW-UP QUESTIONS:
1. EXPLAINING QUOTES: If the user asks questions about a previously provided estimate (e.g., "why is SEO so much?", "how can we reduce the cost?"), DO NOT call 'calculate_price' again. Read your previous estimate breakdown stored in the chat history. Act as a consultant to explain your reasoning, justify the complexities, or suggest dropping specific skills to negotiate the scope.
2. CUSTOM CODE ONLY: Relicsa is a premium development agency that ONLY writes fully custom code from scratch. You must NEVER suggest or agree to use No-Code tools, marketplace templates, or open-source complete clones to build a project.
3. MAINTENANCE & HOSTING: If the user asks about maintenance, hosting, or recurring costs, explain that the estimate is for the build phase, BUT explicitly highlight that Relicsa provides 6 MONTHS OF ABSOLUTE FREE MAINTENANCE. Only after the 6th month will standard recurring hosting/maintenance costs apply.
4. TEXT RESPONSES MUST BE JSON: Whenever you are responding conversationally and NOT calling the 'calculate_price' tool, your response MUST be a valid JSON object exactly like this:
{ "text": "Your markdown-formatted message here.", "suggested_options": ["Option 1", "Option 2"] }
Always provide 2 to 4 highly relevant suggested options for the user to click based on your context (e.g. if asking for features, output 'Authentication', 'Admin Panel', etc.).

CRITICAL: When estimating hours for each selected skill, remember that developers use high-efficiency AI tools (like GitHub Copilot) which speed up development by 30-50%. Do NOT reduce hours by more than 50% of the catalog's base_hours. Complex full-stack applications (like E-Commerce, Social Networks, SaaS) STILL REQUIRE a minimum of 4-6 weeks (160-240+ hours) to architect, build, and secure fully custom code from scratch, even with AI. Do not aggressively under-quote large scopes.

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
                                        items: { 
                                            type: Type.OBJECT,
                                            properties: {
                                                id: { type: Type.STRING },
                                                estimated_hours: { type: Type.NUMBER, description: "Dynamic estimation of hours for this skill, considering high-efficiency AI tool usage." }
                                            },
                                            required: ['id', 'estimated_hours']
                                        },
                                        description: 'The IDs of the skills mapped from the catalog and their dynamically estimated hours.'
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
                const args = call.args as { skills: { id: string, estimated_hours: number }[], summary: string };
                const match: MatchedSkill[] = [];
                (args.skills || []).forEach(selectedSkill => {
                    const foundSkill = skills.find(s => s.id === selectedSkill.id);
                    if (foundSkill) {
                        match.push({ ...foundSkill, estimated_hours: selectedSkill.estimated_hours });
                    }
                });
                
                logger.info(`Agent called calculate_price with ${match.length} skills`);
                return { type: 'estimate', matchedSkills: match, summary: args.summary || 'Summary generated.' };
            }
        }

        let resText = response.text || 'I need more information.';
        let options: string[] = [];
        try {
            const cleaned = resText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            if (parsed.text) resText = parsed.text;
            if (parsed.suggested_options && Array.isArray(parsed.suggested_options)) {
                options = parsed.suggested_options;
            }
        } catch (e) {
            logger.warn('Failed to parse AI JSON response, falling back to raw text');
        }

        return { type: 'text', text: resText, options };
    } catch (error) {
        logger.error('Failed to chat with agent', { error });
        throw new Error('Agent chat failed');
    }
}

export const matchSkills = async (skills: Skill[], projectDescription: string): Promise<{ matchedSkills: MatchedSkill[], summary: string }> => {
    if (!process.env.GEMINI_API_KEY) {
        logger.warn('Gemini API Key missing');
        return { matchedSkills: [], summary: 'API Key missing' };
    }

    const prompt = `
        You are an expert in pricing for IT services and software development.
        Based on the following skills and project description, generate a detailed pricing report.

        Skills:
        ${skills.map(s => `- ID: ${s.id} | Name: ${s.name} | Category: ${s.category} | Description: ${s.description} | Base Hours Reference: ${s.base_hours}`).join('\n')}

        Client Requirement :
        ${projectDescription}

        INSTRUCTIONS:
        1. Select only the skills needed.
        2. Assign "estimated_hours" for each selected skill. CRITICAL: Developers use AI tools (like GitHub Copilot) which speed up development by 30-50%. Do NOT reduce hours by more than 50% of the Base Hours Reference. Complex applications (E-Commerce, SaaS, etc.) STILL REQUIRE a minimum of 4-6 weeks (160-240+ hours) to build robustly from scratch. Do not aggressively under-quote large projects.
        3. Generate a brief 2-3 sentence summary explaining the technical approach and components selected.
        4. Return ONLY a JSON object with keys "skills" (array of objects, each containing "id" and "estimated_hours") and "summary" (string).
        `;
    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        })

        const parsed = JSON.parse(response.text || '{}') as { skills: { id: string, estimated_hours: number }[], summary: string }
        const selectedSkills = parsed.skills || []
        const summary = parsed.summary || 'Summary could not be generated.'
        
        const match: MatchedSkill[] = [];
        selectedSkills.forEach(selected => {
            const foundSkill = skills.find(s => s.id === selected.id);
            if (foundSkill) {
                // Ensure estimated_hours is a number
                const estHours = typeof selected.estimated_hours === 'number' ? selected.estimated_hours : foundSkill.base_hours;
                match.push({ ...foundSkill, estimated_hours: estHours });
            }
        });

        return { matchedSkills: match, summary }
    } catch (error) {
        logger.error('Failed to generate pricing report', { error })
        throw new Error('Pricing report generation failed')
    }
}