import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const privateRoutes = ['/projects'];

const isPrivateRoute = (pathname: string) => {
  return privateRoutes.includes(pathname);
};

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;

    const isPrivate = isPrivateRoute(req.nextUrl.pathname);

    if (!token && isPrivate) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && !isPrivate) {
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
