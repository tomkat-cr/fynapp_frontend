import { authenticationService } from '@/_services';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

// private helper functions from fake-backend.js

export function ok(body) {
    return ({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
}

export function unauthorised() {
    return ({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
}

export function error(message) {
    return ({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
}
