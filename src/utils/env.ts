export const isRunningProd = process.env.NODE_ENV === 'production';

export const isRunningOnServer = (): boolean => typeof window === 'undefined';
