import React from 'react';

import { authenticationService } from '../../_services/db.authentication.service';
import { errorAndReEnter } from '../../_helpers/error-and-reenter';

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
                    // errorAndReEnter(errorMessage)
                    errorAndReEnter(error)
                }
            </div>
        );
    }
}

export { HomePage };