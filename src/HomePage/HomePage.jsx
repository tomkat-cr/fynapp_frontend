import React from 'react';

import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            error: null
        };
    }

    componentDidMount() {
        userService.getAll()
            .then(
                users => this.setState({ users }),
                error => this.setState({ error })
            )
        ;
    }

    render() {
        const { currentUser, users, error } = this.state;

    let errorMessage = null;
    if((users && users.error) || error) {
        errorMessage = ((users && users.error) ? users.message : error);
        users.users = [];
    }
    return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {errorMessage &&
                    <div className={'alert alert-danger'}>{errorMessage}</div>
                }
                {!errorMessage && users &&
                    <ul>
                        {users.users.map(user =>
                            <li key={userService.getUserId(user._id)}>{user.firstname} {user.lastname}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { HomePage };