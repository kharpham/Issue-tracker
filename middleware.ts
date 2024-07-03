 // Redirect the user to the login page
 export {default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/issues/:id/edit',
    ]
}