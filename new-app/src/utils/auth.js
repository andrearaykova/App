function isUserAuthenticated() {
    return window.localStorage.getItem('authToken') !== null;
}

function getToken() {
    return window.localStorage.getItem('authToken');
}

function getUsername() {
    return window.localStorage.getItem('username');
}

function isUserAdmin() {
    let roles = window.localStorage.getItem('roles');
    if (!roles) {
        return false;
    }

    roles = roles.split(',');

    if (roles.includes('Admin')) {
        return true;
    }

    return false;
}

export {
    isUserAuthenticated,
    getToken,
    getUsername,
    isUserAdmin
}; 