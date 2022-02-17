import React from 'react';
import { authenticationService } from '@/_services';
import { history } from '@/_helpers';
import { Button } from 'react-bootstrap';
import { INVALID_TOKEN_MSG } from '@/_constants';

export function logout() {
    authenticationService.logout();
    history.push('/login');
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
    if(errorMessage != INVALID_TOKEN_MSG) {
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