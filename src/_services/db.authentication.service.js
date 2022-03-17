import { console_debug_log } from './loging.service';
import { authHeader } from '../_helpers/auth-header';
import {
    ACTION_CREATE, 
    ACTION_UPDATE, 
    ACTION_DELETE, 
} from '../_constants/general_constants';

import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    // console_debug_log('>>> authenticationService.login() | Begin...');
    let config = {
        apiUrl: process.env.REACT_APP_API_URL
    }
    // console_debug_log('>>> authenticationService.login | process:');
    // console_debug_log(process.env.REACT_APP_API_URL);

    const requestOptions = {
        method: 'POST',
        headers: { "Authorization":  "Basic " + btoa(username + ":" + password) },
        // headers: { "Authorization":  "Basic " + (username + ":" + password).toString('base64') },
        // headers: { "Authorization":  "Basic " + Base64.btoa(username + ":" + password) },
    };
    let userService = new dbApiService({url: 'users'})
    // console_debug_log('>>> authenticationService.login() | userService instanciated | config.apiUrl: ' + config.apiUrl);

    return fetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(handleResponse, handleFetchError)
        .then(res => {
    // console_debug_log('>>> authenticationService.login() | res');
    // console_debug_log(res);
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

// -------------

export function handleResponse(response) {
    // console_debug_log('..--> handleResponse() | Begin... / response:');
    // console_debug_log(response);
    return response.text().then(text => {
        if (!IsJsonString(text)) {
            return Promise.reject(text);
        }
        // const location = useLocation();
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // console_debug_log('..--> handleResponse() | response NO ok... / response.statu ='+response.statu);
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            // console_debug_log('..--> handleResponse() | response NO ok... / error =');
            // console_debug_log(error);
            return Promise.reject(error);
        } else {
            // console_debug_log('..--> handleResponse() | response.ok... / data =');
            // console_debug_log(data);
            if(typeof data.error == 'undefined') {
                data.error = false;
            }
            if(typeof data.error_message != 'undefined') {
                data.message = data.error_message;
            }
            if(typeof data.resultset != 'undefined' && typeof data.resultset != 'object') {
                // When the data.resultset has an array of records (objects) instead of a sigle object, it comes as an encapsulated string
                // console_debug_log('..--> handleResponse() | typeof data.resultset: ' + (typeof data.resultset) + ' | data.resultset BEFORE =');
                // console_debug_log(data.resultset);
                data.resultset = JSON.parse(data.resultset);
            }
            // console_debug_log('..--> handleResponse() | data.resultset =');
            // console_debug_log(data.resultset);
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

// -------------

// import config from 'config';

export class dbApiService {
    
    constructor(props) {
        this.props = props;
     
        this.props.authHeader = authHeader();
        this.props.authAndJsonHeader = Object.assign(
            {}, 
            { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }, 
            this.props.authHeader
        );

        // console_debug_log('dbApiService - process = ');
        // console_debug_log(process);
        // console_debug_log('this.apiUrl = '+this.apiUrl);
        // console_debug_log('dbServices - this.props.authAndJsonHeader:');
        // console_debug_log(this.props.authAndJsonHeader);
    }

    props = null;
    apiUrl = process.env.REACT_APP_API_URL;
    // apiUrl = config.apiUrl;

    paramsToUrlQuery(params) {
        let urlQuery = '';
        Object.entries(params).map(([key, value]) => (
            urlQuery += ((urlQuery === '' ? '?' : '&') + key + '=' + value)
        ));
        return urlQuery;
    }

    getAll(params=[]) {
        const requestOptions = { method: 'GET', headers: this.props.authHeader };
        const urlQuery = this.paramsToUrlQuery(params);
        // console_debug_log('dbServices::getAll() - urlQuery: ');
        // console_debug_log(urlQuery);
        let response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    getOne(params) {
        const requestOptions = { method: 'GET', headers: this.props.authHeader };
        const urlQuery = this.paramsToUrlQuery(params);
        // console_debug_log('dbServices::getOne() - urlQuery: ');
        // console_debug_log(urlQuery);
        let response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    createUpdateDelete(action, id, data, queryParams=[]) {
        switch(action) {
            case ACTION_CREATE:
                return this.createRow(data, queryParams);
            case ACTION_UPDATE:
                return this.updateRow(id, data, queryParams);
            case ACTION_DELETE:
                return this.deleteRow(id, data, queryParams);
            default:
                return handleFetchError('Error CUD-1 - Invalid action: '+action)
        }
    }

    createRow(data, queryParams=[]) {
        const urlQuery = this.paramsToUrlQuery(queryParams);
        // console_debug_log('dbServices::createRow() - data:');
        // console_debug_log(data);
        // console_debug_log('dbServices::createRow() - this.props.authAndJsonHeader:');
        // console_debug_log(this.props.authAndJsonHeader);
        const requestOptions = { 
            method: 'POST',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        let response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    updateRow(id, data, queryParams=[]) {
        const urlQuery = this.paramsToUrlQuery(queryParams);
        if(id !== null) {
            data.id = id;
        }
        // console_debug_log('dbServices::updateRow() - id: '+id+' | data:');
        // console_debug_log(data);
        const requestOptions = { 
            method: 'PUT',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        let response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    deleteRow(id, data, queryParams=[]) {
        let urlQuery = this.paramsToUrlQuery(queryParams);
        if(id !== null) {
            urlQuery += (urlQuery === '' ? '?' : "&")+`id=${id}`;
        }
        const requestOptions = { 
            method: 'DELETE',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        console_debug_log('dbServices::deleteRow() - id: '+id);
        console_debug_log('dbServices::deleteRow() - urlQuery: '+urlQuery);
        console_debug_log('dbServices::deleteRow() - data:');
        console_debug_log(data);
        console_debug_log('dbServices::deleteRow() - requestOptions:');
        console_debug_log(requestOptions);
        let response = fetch(
                `${this.apiUrl}/${this.props.url}${urlQuery}`, 
                requestOptions
            )
            .then(handleResponse, handleFetchError);
        return response;
    }

    convertId(id) {
        return id.$oid;
    }
}
