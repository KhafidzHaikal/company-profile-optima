import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always a string by providing a fallback
  const safeLocale = locale || 'en';
  
  return {
    locale: safeLocale, // This will always be a string now
    messages: (await import(`./messages/${safeLocale}.json`)).default
  };
});