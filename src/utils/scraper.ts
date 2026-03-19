import * as cheerio from 'cheerio';
import { logger } from './logger';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

/**
 * Searches for URLs in a string, fetches the HTML for the first URL found,
 * extracts the visible text, and appends it to the original text.
 */
export const enrichDescriptionWithUrlContent = async (description: string): Promise<string> => {
    try {
        const urls = description.match(URL_REGEX);
        
        if (!urls || urls.length === 0) {
            return description; // No URL found, return original description
        }

        const targetUrl = urls[0]; // Process only the first URL found
        logger.info(`Extracting content from URL: ${targetUrl}`);

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            logger.warn(`Failed to fetch URL: ${targetUrl} (Status: ${response.status})`);
            return description;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Remove scripts, styles, and empty tags to keep clean text
        $('script, style, noscript, iframe, img, svg').remove();

        const title = $('title').text().trim();
        const mainText = $('body').text().replace(/\s+/g, ' ').trim();

        // Limit the text to avoid passing massive tokens to Gemini
        const MAX_CHARS = 4000;
        const truncatedText = mainText.substring(0, MAX_CHARS);

        logger.info(`Successfully extracted ${truncatedText.length} characters from ${title}`);

        return `${description}\n\n[System Info: The user provided a link to a website. Here is the extracted text content from that website to help you estimate the skills needed:]\nWebsite Title: ${title}\nWebsite Content Snippet: ${truncatedText}`;

    } catch (error) {
        logger.error('Error fetching or parsing URL content', { error });
        return description; // Fallback to original description if scraping fails
    }
};
