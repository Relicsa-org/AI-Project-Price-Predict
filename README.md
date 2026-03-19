# AI Project Price Predict

A Node.js backend application for predicting project prices using AI.

## Technologies Used
- Node.js & TypeScript
- Express.js
- Google GenAI API (`@google/genai`)
- Cheerio (for web scraping)
- Markdown parsing (`gray-matter`, `js-yaml`)

## Prerequisites
- Node.js (v18 or higher recommended)
- API keys (Google GenAI, etc.)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configuration:
   Create a `.env` file in the root directory based on the environment variables required (e.g., API keys, port configuration).

3. Development mode:
   To run the application in development mode with hot-reloading:
   ```bash
   npm run dev
   # or
   npm run watch
   ```

## Production Build
To build the TypeScript code into JavaScript and start the production server:
```bash
npm run build
npm start
```
