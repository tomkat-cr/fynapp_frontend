import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function getPrefix(hardPrefix=false) {
    if (hardPrefix) {
        return '/'+process.env.REACT_APP_URI_PREFIX;
    }
    return '';
}
