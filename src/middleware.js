import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublic = path==='/login' || path==='/signup' || path==='/';
    const hasToken = request.cookies.get('token')?.value || '';
    if(isPublic && hasToken){
        return NextResponse.redirect(new URL('/home', request.url))
    }
    if(!isPublic && !hasToken){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/customitineary',
    '/chatgroups',
    '/billsplitter',
    '/todo',
    '/home',
    '/login',
    '/signup',
    '/',
  ] 
}