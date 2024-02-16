import { api } from "./Api";

function isPathname(pathnames: string[]): boolean {
    return pathnames.some(pathname => window.location.pathname === pathname);
}

export function checkAuthentication() {
    const token = localStorage.getItem('token');
    const guestPages = ['/', '/sign-in', '/register'];
    const privatePages = ['/profile', '/event-creator'];
    const adminPages = ['/adminDashboard'];

    if (token !== null) {
        api.get('/checkToken', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.data.user) {
                // Prevent guest accessing private pages
                if (isPathname(privatePages)) {
                    window.location.pathname = '/';
                }
            } else {
                if (isPathname(guestPages)) {
                    window.location.pathname = '/map';
                }
                // Prevent admin accessing non-admin pages
                if (response.data.user.is_admin === 1) {
                    if (!isPathname(adminPages)) {
                        window.location.pathname = '/adminDashboard';
                    }
                }
            }
        })
        .catch(() => {
            // console.log(error);
            localStorage.removeItem('token');
            location.reload();
        })
    }
}

// This code is to be included in each page, to prevent unauthorized user from accessing user-exclusive pages