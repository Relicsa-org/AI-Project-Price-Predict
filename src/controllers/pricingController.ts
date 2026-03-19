import { Request, Response, NextFunction } from 'express';
import { generateEstimate } from '../services/pricingService';
import { logger } from '../utils/logger';
import { EstimateResult } from '../types';

export const getEstimate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectDescription, location } = req.body;

        if (!projectDescription || typeof projectDescription !== 'string') {
            res.status(400).json({
                success: false,
                message: 'Requirement text is required and must be a string'
            });
            return;
        }

        logger.info(`Received request: ${projectDescription.substring(0, 50)}...`);

        const estimate = await generateEstimate(projectDescription, location || 'India');
        res.json({
            success: true,
            data: estimate,
            message: 'Estimate generated successfully'
        });
    } catch (error) {
        logger.error('Failed to create estimate', { error });
        next(error);
    }
}