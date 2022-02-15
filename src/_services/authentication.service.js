import { BehaviorSubject } from 'rxjs';

import config from 'config';

import { handleResponse, handleFetchError, Base64 } from '@/_helpers';
import { dbApiService } from '@/_services';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { "Authorization":  "Basic " + Base64.btoa(username + ":" + password) },
    };
    let userService = new dbApiService({url: 'users'})

    return fetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(handleResponse, handleFetchError)
        .then(res => {
            if(res.error) {
                return Promise.reject(res.message);
            }
            let user = {
                id: userService.convertId(res._id),
                username: res.username,
                email: res.email,
                firstName: res.firstname,
                lastName: res.lastname,
                token: res.token
            };
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
