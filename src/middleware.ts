import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;
  const isUnauthenticatedPathname = isUnauthenticatedEndpoint(pathname);
  const canRunOnAllCases = canEndpointRunOnAllCases(pathname);

  if (isAuthenticated && isUnauthenticatedPathname && !canRunOnAllCases) {
    // Do not redirect to "/" because the redirect is being done in next.config.js
    return NextResponse.redirect(new URL('/dashboard', req.url));
  } else if (isUnauthenticatedPathname || canRunOnAllCases) {
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

/**
 * Validates if an endpoint can run with or without session
 * @param pathname
 */
const canEndpointRunOnAllCases = (pathname: string): boolean => {
  return new RegExp(/(package\/*).*/).test(pathname);
};

const isUnauthenticatedEndpoint = (pathname: string): boolean => {
  return new RegExp(
    /(login|forgot-password|onboarding|user\/confirm\/*|password\/reset\/*).*/
  ).test(pathname);
};

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};
