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
    console.log('\\\/// authenticationService.login() | Begin...');
    const requestOptions = {
        method: 'POST',
        headers: { "Authorization":  "Basic " + Base64.btoa(username + ":" + password) },
    };
    let userService = new dbApiService({url: 'users'})
    console.log('\\\/// authenticationService.login() | userService instanciated | config.apiUrl: ' + config.apiUrl);

    return fetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(handleResponse, handleFetchError)
        .then(res => {
    console.log('\\\/// authenticationService.login() | res');
    console.log(res);
            if(res.error) {
                return Promise.reject(res.message);
            }
            let user = {
                id: userService.convertId(res.resultset._id),
                username: res.resultset.username,
                email: res.resultset.email,
                firstName: res.resultset.firstname,
                lastName: res.resultset.lastname,
                token: res.resultset.token
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
