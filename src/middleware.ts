import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

const publicRoutes = ['/', '/login'];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.includes(pathname);
};

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;

    const isPublic = isPublicRoute(req.nextUrl.pathname);

    if (!isAuth && !isPublic) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAuth && isPublic) {
      return NextResponse.redirect(new URL('/projects', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // This is a workaround so the middleware function above is always called
      authorized: () => true
    }
  }
);

export const config = {
  matcher: ['/projects/:path*', '/', '/login']
};
