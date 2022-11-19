import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function getPrefix() {
    return '';
    // return '/'+process.env.REACT_APP_URI_PREFIX;
}
