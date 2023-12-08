import { hasTokenExpired } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const LogoutPath = '/';

export default async function middleware(req: NextRequest) {
  console.log('------------- [Middleware] - Start -------------');
  const token = await getToken({ req });
  const accessToken = token?.user?.accessToken;
  const isAuthenticated = !!token;
  const isTokenExpired = isAuthenticated && accessToken && hasTokenExpired(accessToken);
  const { pathname } = req.nextUrl;

  console.log('[Middleware] pathname: ', pathname);
  console.log('[Middleware] isAuthenticated: ', isAuthenticated);
  console.log('[Middleware] isTokenExpired: ', isTokenExpired);

  if (isTokenExpired) {
    if (pathname !== LogoutPath) {
      return NextResponse.redirect(new URL(LogoutPath, req.url));
    } else {
      return NextResponse.next();
    }
  }
  const isPathnameFree = isFreePathname(pathname);
  const mustNotContainSession = pathnameMustNotContainSession(pathname);

  if (isAuthenticated) {
    const isRootPathname = pathname === '/';
    const isBrokerUser = token?.user?.isBroker || false;
    const shouldRedirectBrokerPathnameAccess = !isBrokerUser && isBrokerOnlyPathname(pathname);

    if (mustNotContainSession || isRootPathname || shouldRedirectBrokerPathnameAccess) {
      console.log('*** REDIRECTING TO DASHBOARD ***');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    console.log('Continue loading regular auth endpoint...');
    // Continue loading the authenticated endpoint
    return NextResponse.next();
  }

  if (isPathnameFree || mustNotContainSession) {
    // Continue loading the endpoint
    return NextResponse.next();
  }

  console.log('------------- [Middleware] - End -------------');
  return NextResponse.redirect(new URL('/login', req.url));
}

/**
 * Validates if an endpoint can run with or without session
 * @param pathname
 */
const isFreePathname = (pathname: string): boolean => {
  return new RegExp(/(^\/package\/*|api\/email\/*).*/).test(pathname);
};

const pathnameMustNotContainSession = (pathname: string): boolean => {
  return new RegExp(
    /(login|forgot-password|onboarding|user\/confirm\/*|password\/reset\/*).*/
  ).test(pathname);
};

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)', '/'],
};

const isBrokerOnlyPathname = (pathname: string): boolean => {
  return new RegExp(/(^\/set-package\/*).*/).test(pathname);
};
