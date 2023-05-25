import { console_debug_log } from '../_services';
import { authenticationService } from '../_services/db.authentication.service';

export function authHeader() {
    // Returns authorization header with jwt token
    let currentUser = null;
    try {
        currentUser = authenticationService.currentUserValue;
    } catch (error) {
        console_debug_log(`authHeader | ERROR: ${error}`);
    }
    if (currentUser && currentUser.token) {
        return { 'x-access-tokens': currentUser.token };
    } else {
        return {};
    }
}
