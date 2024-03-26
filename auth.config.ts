import type { NextAuthConfig } from 'next-auth'; // we only import the type, not any values

export const authConfig = {
  /*pages: This section configures the URLs of authentication-related pages.
   In this case, it specifies that the sign-in page should be accessed at /login. */ 
  pages: {
      signIn: '/login', 
    },
   
    callbacks: { 
     // It checks if the user is authenticated (isLoggedIn) and if they are accessing the dashboard (isOnDashboard). 
        authorized({ auth, request: { nextUrl } }) { // The auth property contains the user's session, and the request property contains the incoming request.
          const isLoggedIn = !!auth?.user; 
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
          return true;
        },
      },
      providers: [], // Add providers with an empty array for now
    } satisfies NextAuthConfig; 
    //It satisfies the type NextAuthConfig, meaning it conforms to the structure expected by NextAuth.
  