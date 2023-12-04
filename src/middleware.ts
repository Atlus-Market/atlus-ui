import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { hasTokenExpired } from '@/utils/auth';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middlewares(req: NextRequest, event: NextFetchEvent) {
  console.log('------------- [Middleware] -------------');
  const logoutPath = '/logout';
  const token = await getToken({ req });
  const accessToken = token?.user?.accessToken;
  const isBrokerUser = token?.user?.isBroker || false;
  const isAuthenticated = !!token;
  const isTokenExpired = isAuthenticated && accessToken && hasTokenExpired(accessToken);
  const { pathname } = req.nextUrl;

  console.log('[Middleware] pathname: ', pathname);
  console.log('[Middleware] isAuthenticated: ', isAuthenticated);
  console.log('[Middleware] isTokenExpired: ', isTokenExpired);

  if (isTokenExpired) {
    if (pathname !== logoutPath) {
      return NextResponse.redirect(new URL(logoutPath, req.url));
    } else {
      return NextResponse.next();
    }
  }

  const isUnauthenticatedPathname = isUnauthenticatedEndpoint(pathname);
  const canRunOnAllCases = canEndpointRunOnAllCases(pathname);

  // Prevent access to pages that are for users with no auth session
  if (isAuthenticated && isUnauthenticatedPathname && !canRunOnAllCases) {
    // Do not redirect to "/" because the redirect is being done in next.config.js
    return NextResponse.redirect(new URL('/dashboard', req.url));
  } else if (isUnauthenticatedPathname || canRunOnAllCases) {
    // Continue loading the free endpoint
    return NextResponse.next();
  }

  if (isBrokerOnlyPathname(pathname) && !isBrokerUser) {
    console.log('User is not broker. Redirecting...');
    return NextResponse.redirect(new URL('/dashboard', req.url));
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
  return new RegExp(/(^\/package\/*|api\/email\/*).*/).test(pathname);
};

const isUnauthenticatedEndpoint = (pathname: string): boolean => {
  return new RegExp(
    /(login|forgot-password|onboarding|user\/confirm\/*|password\/reset\/*).*/
  ).test(pathname);
};

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};

const isBrokerOnlyPathname = (pathname: string): boolean => {
  return new RegExp(/(^\/set-package\/*).*/).test(pathname);
};
