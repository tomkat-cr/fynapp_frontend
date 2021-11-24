import config from 'config';
import { authHeader, handleResponse, handleFetchError } from '@/_helpers';

export const userService = {
    getAll,
    getUserId
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let response = fetch(`${config.apiUrl}/users`, requestOptions)
            .then(handleResponse, handleFetchError);
    return response;
}

function getUserId(id) {
    return id.$oid;
}