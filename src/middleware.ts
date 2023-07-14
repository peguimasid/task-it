import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const publicRoutes = ['/', '/login'];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.includes(pathname);
};

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;

    const isPublic = isPublicRoute(req.nextUrl.pathname);

    if (!token && !isPublic) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && isPublic) {
      return NextResponse.redirect(new URL('/projects', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
