import app from '../src/app';
import { loadConfig } from '../src/config';

// Initialize configuration from .env before accepting requests
try {
    loadConfig();
} catch (error) {
    console.error("Critical error during config load:", error);
}

// Export the Express App seamlessly for Vercel's serverless runtime
export default app;
