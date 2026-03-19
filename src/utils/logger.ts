type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogData {
    [key: string]: unknown;
}

const log = (level: LogLevel, message: string, data: LogData = {}): void => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`, data);
};

export const logger = {
    info: (msg: string, data?: LogData) => log('info', msg, data),
    error: (msg: string, data?: LogData) => log('error', msg, data),
    warn: (msg: string, data?: LogData) => log('warn', msg, data),
    debug: (msg: string, data?: LogData) => log('debug', msg, data),
};