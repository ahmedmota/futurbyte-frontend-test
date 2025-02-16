import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (!url.pathname.endsWith("/") &&  !url.pathname.includes("api")) {
    url.pathname = `${url.pathname}/`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
