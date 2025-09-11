import {
    getCookie,
    setCookie,
    deleteCookie,
} from 'cookies-next/client';

function storeToken(token) {
    setCookie('token', token, {
        httpOnly: false,
        secure: true,
        sameSite: 'none'
    });
}

function getToken() {
    return getCookie('token');
}

function clearToken() {
    deleteCookie('token');
}

function storeAdminName(name) {
    setCookie('adminName', name, {
        httpOnly: false,
        secure: true,
        sameSite: 'none'
    });
}

function getAdminName() {
    return getCookie('adminName');
}

function clearAdminName() {
    deleteCookie('adminName')
}

export { storeToken, getToken, clearToken, storeAdminName, getAdminName, clearAdminName }