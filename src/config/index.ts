import { Config } from '../types';
import { logger } from '../utils/logger';

let config: Config | null = null;

export const loadConfig = (): Config => {
    try {
        config = {
            agency_name: process.env.AGENCY_NAME || "Relicsa",
            currency: process.env.CURRENCY || "INR",
            
            margin_percentage: parseFloat(process.env.MARGIN_PERCENTAGE || "10"),
            risk_buffer_default: parseFloat(process.env.RISK_BUFFER_DEFAULT || "15"),
            
            exchange_rates: {
                USD: parseFloat(process.env.EXCHANGE_USD || "83.5"),
                EUR: parseFloat(process.env.EXCHANGE_EUR || "90.0"),
            },
            
            rates: {
                junior_dev: parseFloat(process.env.RATE_JUNIOR_DEV || "600"),
                mid_dev: parseFloat(process.env.RATE_MID_DEV || "1000"),
                senior_dev: parseFloat(process.env.RATE_SENIOR_DEV || "1800"),
                ai_engineer: parseFloat(process.env.RATE_AI_ENGINEER || "2000"),
                qa_engineer: parseFloat(process.env.RATE_QA_ENGINEER || "800"),
                project_manager: parseFloat(process.env.RATE_PROJECT_MANAGER || "1000"),
                ui_ux_designer: parseFloat(process.env.RATE_UI_UX_DESIGNER || "1200"),
                seo_specialist: parseFloat(process.env.RATE_SEO_SPECIALIST || "1200"),
                digital_marketer: parseFloat(process.env.RATE_DIGITAL_MARKETER || "1000"),
                ppc_specialist: parseFloat(process.env.RATE_PPC_SPECIALIST || "1200"),
                content_writer: parseFloat(process.env.RATE_CONTENT_WRITER || "800"),
                social_media_manager: parseFloat(process.env.RATE_SOCIAL_MEDIA_MANAGER || "1000"),
                brand_designer: parseFloat(process.env.RATE_BRAND_DESIGNER || "1400"),
                graphic_designer: parseFloat(process.env.RATE_GRAPHIC_DESIGNER || "1000"),
                motion_designer: parseFloat(process.env.RATE_MOTION_DESIGNER || "1500"),
            },
            
            global_multiplier: {
                india: parseFloat(process.env.MULTIPLIER_INDIA || "1.0"),
                us_uk: parseFloat(process.env.MULTIPLIER_US_UK || "2.5"),
                europe: parseFloat(process.env.MULTIPLIER_EUROPE || "2.2"),
                middle_east: parseFloat(process.env.MULTIPLIER_MIDDLE_EAST || "1.8"),
                australia: parseFloat(process.env.MULTIPLIER_AUSTRALIA || "2.3"),
                southeast_asia: parseFloat(process.env.MULTIPLIER_SOUTHEAST_ASIA || "1.5")
            }
        };

        logger.info('Configuration loaded successfully from environment variables');
        return config;
    } catch (error) {
        logger.error('Failed to load environment configuration', { error });
        throw new Error('Environment configuration load failed');
    }
};

export const getConfig = (): Config => {
    if (!config) return loadConfig();
    return config;
};