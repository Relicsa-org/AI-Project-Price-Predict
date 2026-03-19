import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { logger } from './utils/logger';
import { loadConfig } from './config';

const PORT = process.env.PORT || 3000;

try {
    loadConfig();
    app.listen(PORT, () => {
        logger.info(`🚀 Relicsa Pricing API running on port ${PORT}`);
        logger.info(`📡 Endpoint: POST http://localhost:${PORT}/api/estimate`);
    });
} catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
}

process.on('SIGINT', () => {
    logger.info('Server is shutting down');
    process.exit(0);
});