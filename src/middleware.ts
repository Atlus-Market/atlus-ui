import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { hasTokenExpired } from '@/utils/auth';

export default async function middlewares(req: NextRequest, event: NextFetchEvent) {
  console.log('------------- [Middleware] -------------');
  const logoutPath = '/logout';
  const token = await getToken({ req });
  const accessToken = token?.user?.accessToken;
  const isAuthenticated = !!token;
  const isTokenExpired = isAuthenticated && accessToken && hasTokenExpired(accessToken);
  const { pathname } = req.nextUrl;

  console.log('[Middleware] pathname: ', pathname);
  console.log('[Middleware] isAuthenticated: ', isAuthenticated);
  console.log('[Middleware] isTokenExpired: ', isTokenExpired);

  if (isTokenExpired && pathname !== logoutPath) {
    return NextResponse.redirect(new URL(logoutPath, req.url));
  }

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

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log('[middleware] function...');
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token, ...rest }) => {
//         console.log('[middleware] authorized...', rest.req.url, token);
//         // return false;
//         return token?.role !== 'admin';
//       },
//     },
//     pages: {
//       signIn: '/login',
//     },
//   }
// );

/**
 * Validates if an endpoint can run with or without session
 * @param pathname
 */
const canEndpointRunOnAllCases = (pathname: string): boolean => {
  return new RegExp(/(^\/package\/*).*/).test(pathname);
};

const isUnauthenticatedEndpoint = (pathname: string): boolean => {
  return new RegExp(
    /(login|forgot-password|onboarding|user\/confirm\/*|password\/reset\/*).*/
  ).test(pathname);
};

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};
