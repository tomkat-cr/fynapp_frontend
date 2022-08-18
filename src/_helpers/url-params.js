export function getUrlParams(props) {
    let urlParams = {};
    if (props.hasOwnProperty('location')) {
        if (props.location.hasOwnProperty('search')) {
            if (props.location.search !== '') {
                let searchString = props.location.search;
                if (searchString.substring(0,1) === '?') {
                    searchString = props.location.search.slice(1);
                }
                let keyPairs = searchString.split("&");
                if(Array.isArray(keyPairs)) {
                    keyPairs.map(keyPairString => {
                        let KeyValueArray = keyPairString.split('=');
                        urlParams[KeyValueArray[0]] = 
                            (typeof KeyValueArray[1] === 'undefined' ? '' : KeyValueArray[1]);
                        return null;
                    });
                }
            }
        }
    } else {
        if (props.hasOwnProperty('match')) {
            if (props.match.hasOwnProperty('params')) {
                urlParams = props.match.params;
            }
        }
    }
    return urlParams;
}
