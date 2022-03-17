import { MSG_ERROR_INVALID_TOKEN } from '../_constants/general_constants';
import { authenticationService } from '../_services';
import React from 'react';
import { Button } from 'react-bootstrap';
import { history } from '.';

export function logout() {
    authenticationService.logout();
    history.push('/login?redirect='+window.location.pathname);
};

export function refreshPage() {
    window.location.reload();;
};

export function errorAndReEnter(errorMessage) {
    return (
        <div>
            { errorAndRetry(errorMessage) }
            { errorLoginAgain(errorMessage) }
        </div>
    );
}

export function errorLoginAgain(errorMessage) {
    if(errorMessage !== MSG_ERROR_INVALID_TOKEN) {
        return (
            <div></div>
        );
    }
    return (
        <div>
            <br/>
            <Button onClick={logout}>Click here to login again</Button>
        </div>
    );
}

export function errorAndRetry(errorMessage) {
    return (
        <div>
            { errorMessageDiv(errorMessage) }
            <br/>
            <Button onClick={refreshPage}>Click here to retry</Button>
        </div>
    );
}

export function errorMessageDiv(errorMessage) {
    return (
        <div className={'alert alert-danger'}>{errorMessage}</div>
    );
}