import { NextResponse, type NextRequest } from "next/server";
import { projectSlugs } from "@/content/slugs";

/**
 * Unknown case-study URLs get a real 404 on the first request. Without this,
 * partial prerendering streams a 200 shell before the page can call notFound().
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !projectSlugs.includes(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/work/:slug",
};
