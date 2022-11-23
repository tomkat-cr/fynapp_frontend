import { 
    MSG_ERROR_INVALID_TOKEN,
    MSG_ERROR_CLICK_TO_RELOGIN,
    MSG_ERROR_CLICK_TO_RETRY,
    MSG_ERROR_SESSION_EXPIRED
} from '../_constants/general_constants';
import { authenticationService } from '../_services';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { history, getPrefix } from '.';

export function logout() {
    authenticationService.logout();
    history.push(getPrefix(true)+'/login?redirect='+window.location.pathname);
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
            <Button as={RouterLink} to={getPrefix()+'/login'} onClick={logout}>{MSG_ERROR_CLICK_TO_RELOGIN}</Button>
        </div>
    );
}

export function errorAndRetry(errorMessage) {
    return (
        <div>
            {errorMessageDiv(
                (
                    errorMessage === MSG_ERROR_INVALID_TOKEN
                    ? MSG_ERROR_SESSION_EXPIRED
                    : errorMessage
                )
            )}
            <br/>
            <Button onClick={refreshPage}>{MSG_ERROR_CLICK_TO_RETRY}</Button>
        </div>
    );
}

export function errorMessageDiv(errorMessage) {
    return (
        <div className={'alert alert-danger'}>{errorMessage}</div>
    );
}