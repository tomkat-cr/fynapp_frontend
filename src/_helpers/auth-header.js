import { authenticationService } from '../_services/db.authentication.service';

export function authHeader() {
    // Returns authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
        // let headers = { 'x-access-tokens': currentUser.token };
        // return headers;
    } else {
        return {};
    }
}