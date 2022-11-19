import React from 'react';

import { authenticationService } from '../../_services/db.authentication.service';
import { errorAndReEnter } from '../../_helpers/error-and-reenter';
import { LoginPage } from '../LoginPage/LoginPage';
// import { getPrefix } from '../../_helpers';

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
                {!currentUser &&
                    <LoginPage/>
                }
                {currentUser &&
                    <h1>Hi {currentUser.firstName}!</h1>
                }
                {error &&
                    errorAndReEnter(error)
                }
            </div>
        );
    }
}

export { HomePage };