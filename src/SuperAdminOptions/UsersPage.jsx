import React from 'react';
import { Table } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faPlus, faEye, faEdit, faTrashAlt);

import { userService, authenticationService } from '@/_services';

class UsersPage extends React.Component {
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
    }
    let i = 1;
    return (
            <div>
                <h3>Users</h3>
                {errorMessage &&
                    <div className={'alert alert-danger'}>{errorMessage}</div>
                }
                {!errorMessage && users &&
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th colSpan="2"></th>
                        <th><a href={"/users/new"}><FontAwesomeIcon icon="plus" /></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users.map(user =>
                            <tr key={userService.getUserId(user._id)}>
                            <td><a href={"/users/"+userService.getUserId(user._id)}>{i++}</a></td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td><a href={"/users/"+userService.getUserId(user._id)}><FontAwesomeIcon icon="eye" /></a></td>
                            <td><a href={"/users/update/"+userService.getUserId(user._id)}><FontAwesomeIcon icon="edit" /></a></td>
                            <td><a href={"/users/remove"+userService.getUserId(user._id)}><FontAwesomeIcon icon="trash-alt" /></a></td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                }
            </div>
        );
    }
}

export { UsersPage };