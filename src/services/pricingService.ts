import { getConfig } from '../config';
import { loadSkills } from './skillService';
import { matchSkills } from './aiService';
import { logger } from '../utils/logger';
import { Skill, Estimate, EstimateBreakdown, EstimateResult } from '../types';
import { enrichDescriptionWithUrlContent } from '../utils/scraper';

const calculatePriceLogic = (
    selectedSkills: Skill[],
    config: ReturnType<typeof getConfig>,
    clientLocation: string):
    Estimate => {
    let totalHours: number = 0;
    let totalCost: number = 0;
    const breakdown: EstimateBreakdown[] = [];

    const multiplier = config.global_multiplier[clientLocation] || 1;

    selectedSkills.forEach(s => {
        let skillCost = 0
        const skillHours = s.base_hours || 0;

        s.roles_required.forEach(roleReq => {
            const roleRate = config.rates[roleReq.role] || 0;
            const roleHours = skillHours * (roleReq.percentage / 100);
            skillCost += roleRate * roleHours;
        })

        const bufferAmount = skillCost * ((s.risk_buffer || 0) / 100);
        const finalSkillCost = skillCost + bufferAmount;

        totalHours += skillHours;
        totalCost += finalSkillCost;

        breakdown.push({
            skill: s.name,
            hours: skillHours,
            cost: finalSkillCost
        })
    })

    const finalCost = totalCost * (1 + (config.margin_percentage / 100));
    const finalPrice = finalCost * multiplier;

    return {
        totalHours,
        totalCostINR: finalCost,
        totalCostUSD: Math.round(finalPrice / config.exchange_rates.USD),
        breakdown,
        timelineWeeks: Math.ceil(totalHours / 40)
    }

}

export const generateEstimateFromSkills = (matchedSkills: Skill[], summary: string, location: string): EstimateResult => {
    logger.info(`Generating estimate struct for location: ${location}`);

    const config = getConfig();

    if (matchedSkills.length === 0) {
        throw new Error('No matching skills found for the given requirement');
    }

    const estimate = calculatePriceLogic(matchedSkills, config, location);

    logger.info('Estimate struct generated successfully');
    return {
        requirement: 'Conversational Input', // Deprecated in chat
        location,
        summary,
        estimate,
        matchedSkills
    };
};

export const generateEstimate = async (projectDescription: string, location: string): Promise<EstimateResult> => {
    logger.info(`Generating estimate for location: ${location}`);

    try {
        const config = getConfig()
        const allSkills = await loadSkills()

        logger.info('Matching skills with project description')
        const enrichedDescription = await enrichDescriptionWithUrlContent(projectDescription);
        const { matchedSkills, summary } = await matchSkills(allSkills, enrichedDescription)

        if (matchedSkills.length === 0) {
            throw new Error('No matching skills found for the given requirement');
        }

        const estimate = calculatePriceLogic(matchedSkills, config, location);

        logger.info('Estimate generated successfully')
        return {
            requirement: projectDescription,
            location,
            summary,
            estimate,
            matchedSkills
        }
    } catch (error) {
        logger.error('Failed to generate estimate', { error })
        throw new Error('Estimate generation failed')
    }
}