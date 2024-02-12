import { api } from "./Api";

function isPathname(pathnames: string[]): boolean {
    return pathnames.some(pathname => window.location.pathname === pathname);
}

export function checkAuthentication() {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('is_admin');
    const publicPages = ['/', '/signin', '/register', '/map'];
    const privatePages = ['/map'];
    const adminPages = ['/adminDashboard'];

    api.get('/checkToken', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(() => {
        // TODO: Not done
        // Prevent guest accessing private pages
        if (isPathname(privatePages)) {
            window.location.pathname = '/';
        }

        // Prevent user accessing non-user pages
        if (!isPathname(['/map']) && isPathname(publicPages)) {
            window.location.pathname = '/map';
        }

        // Prevent user accessing non-admin pages
        if (admin === 'true' && !isPathname(adminPages)) {
            window.location.pathname = '/adminDashboard';
        }
    })
    .catch(() => {
        localStorage.removeItem('token');
        // console.log(error);
        // window.location.pathname = '/';
    })
}

// This code is to be included in each page, to prevent unauthorized user from accessing user-exclusive pages