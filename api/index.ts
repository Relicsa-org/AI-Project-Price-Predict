import app from '../src/app';
import { loadConfig } from '../src/config';
import serverless from 'serverless-http';

// Load env/config
try {
    loadConfig();
} catch (error) {
    console.error("Critical error during config load:", error);
}

// Wrap Express app for Vercel
export default serverless(app);