import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import pricingRoutes from './routes/pricingRoutes';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json());

// Serve the static frontend client folder
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/pricing', pricingRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'AI Price Predict service is running'
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled error', { error: err });
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

export default app;