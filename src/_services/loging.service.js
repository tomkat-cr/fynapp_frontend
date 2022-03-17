export function console_debug_log(debug_message) {
    if(get_debug_flag() === true) {
        console.log(debug_message);
    }
}

export function get_debug_flag() {
    if(typeof window.fynapp_local_debug === 'undefined') {
        if(process.env.hasOwnProperty('REACT_APP_DEBUG')) {
            window.fynapp_local_debug = (process.env.REACT_APP_DEBUG === '1');
        } else {
            window.fynapp_local_debug = false;
        }
    }
    return window.fynapp_local_debug;
}