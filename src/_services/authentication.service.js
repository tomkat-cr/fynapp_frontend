import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse, Base64, ok, error, unauthorised } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };
    const requestOptions = {
        method: 'POST',
        //headers: { "Authorization":  "Basic " + btoa(username + ":" + password) },
        headers: { "Authorization":  "Basic " + Base64.btoa(username + ":" + password) },
        // headers: { "Authorization":  "Basic " + (username + ":" + password).toString('base64') },
        // body: JSON.stringify({})
    };

    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    return fetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(handleResponse)
        // .then(user => {
        .then(res => {
console.log("RESPONSE RECEIVED: ", res);
console.log("Token: ", res.token);
            let user = {
                id: 0,
                username: username,
                firstName: 'firstName',
                lastName: 'lastName',
                token: res.token
            };
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return ok(user);
        })
        .catch((err) => {  
console.log("BACKEND ERROR: ", err);
            return error(err + ' [BE-E010]');
        })
        ;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
