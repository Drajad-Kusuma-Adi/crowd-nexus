import { api } from "./Api";

function isPathname(pathnames: string[]): boolean {
    return pathnames.some(pathname => window.location.pathname === pathname);
}

export async function checkAuthentication() {
    const token = localStorage.getItem('token');
    const guestPages = ['/', '/sign-in', '/register'];
    const privatePages = ['/profile', '/event-creator'];
    const adminPages = ['/adminDashboard'];

    if (token !== null) {
        try {
            const response = await api.get('/checkToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.data.user) {
                if (isPathname(privatePages)) {
                    window.location.pathname = '/';
                }
            } else {
                if (isPathname(guestPages)) {
                    window.location.pathname = '/map';
                }
                if (response.data.user.is_admin === 1) {
                    if (!isPathname(adminPages)) {
                        window.location.pathname = '/adminDashboard';
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

// This code is to be included in each page, to prevent unauthorized user from accessing user-exclusive pages