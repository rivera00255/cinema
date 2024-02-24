import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // if (request.nextUrl.pathname.startsWith('/person')) {
  //   return NextResponse.rewrite(new URL('/search', request.url));
  // }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
