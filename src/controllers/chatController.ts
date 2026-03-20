import { Request, Response, NextFunction } from 'express';
import { loadSkills } from '../services/skillService';
import { chatWithAgent, ChatHistory } from '../services/aiService';
import { generateEstimateFromSkills } from '../services/pricingService';
import { logger } from '../utils/logger';

export const processChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { history, location } = req.body;

        if (!history || !Array.isArray(history)) {
            res.status(400).json({ success: false, message: 'Valid conversation history is required' });
            return;
        }

        logger.info(`Processing chat turn with ${history.length} messages`);

        const allSkills = await loadSkills();
        
        // Ensure strictly structured history array
        const formattedHistory: ChatHistory = history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user', // strictly limit subset
            content: msg.text
        }));

        // Send to Gemini
        const agentResponse = await chatWithAgent(allSkills, formattedHistory);

        if (agentResponse.type === 'estimate') {
            // Function call triggered! Calculate strict final price.
            const estimatePayload = generateEstimateFromSkills(
                agentResponse.matchedSkills || [], 
                agentResponse.summary || '', 
                location || 'india'
            );

            res.json({
                success: true,
                type: 'estimate',
                data: estimatePayload,
                message: 'Pricing tool successfully called'
            });
            return;
        }

        // Standard text reply
        res.json({
            success: true,
            type: 'text',
            text: agentResponse.text,
            options: agentResponse.options || [],
            message: 'Chat reply generated'
        });

    } catch (error) {
        logger.error('Failed to process chat', { error });
        next(error);
    }
};
