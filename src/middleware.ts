import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;
  const isFreePathname = isUnauthenticatedEndpoint(pathname);

  if (isAuthenticated && isFreePathname) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  } else if (isFreePathname) {
    // Continue loading the free endpoint
    return NextResponse.next();
  }

  // The pathname requires auth and the user is not logged in
  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  if (authMiddleware instanceof Response) {
    return authMiddleware;
  }

  if (authMiddleware) {
    return authMiddleware(req as NextRequestWithAuth, event);
  }

  return authMiddleware;
}

const isUnauthenticatedEndpoint = (pathname: string) => {
  return new RegExp(
    /(login|forgot-password|onboarding|user\/confirm\/*|password\/reset\/*).*/
  ).test(pathname);
};

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};
