import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const userAuthenticated = request.cookies.get("userAuthenticated");
  const token = request.cookies.get("authToken");


  // Se o usuário não estiver autenticado e tentar acessar o dashboard
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se o usuário já estiver autenticado e tentar acessar a página de login
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
