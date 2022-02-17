import React from 'react';

import { authenticationService } from '@/_services';
import { errorAndReEnter } from '@/_helpers';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            error: null
        };
    }

    render() {
        const { currentUser, error } = this.state;

    return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                {error &&
                    errorAndReEnter(errorMessage)
                }
            </div>
        );
    }
}

export { HomePage };