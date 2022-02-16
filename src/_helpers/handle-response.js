import { authenticationService } from '@/_services';

export function handleResponse(response) {
    return response.text().then(text => {
        if (!IsJsonString(text)) {
            return Promise.reject(text);
        }
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            if(typeof data.error == 'undefined') {
                data.error = false;
            }
            if(typeof data.error_message != 'undefined') {
                data.message = data.error_message;
            }
            if(typeof data.resultset != 'undefined') {
                data.resultset = JSON.parse(data.resultset);
            }
        }

        return data;
    });
}

export function handleFetchError(reason) {
    return {error: true, message: 'Connection failure', reason: reason};
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
