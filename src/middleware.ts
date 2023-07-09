export { default } from 'next-auth/middleware';

/**
 * Specify which pages will be protected, whole app by default
 * @see https://next-auth.js.org/configuration/nextjs#basic-usage
 */
export const config = {
  matcher: ['/projects']
};
