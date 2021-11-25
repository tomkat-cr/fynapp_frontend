import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { UsersPage } from '@/SuperAdminOptions';
import { LoginPage } from '@/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(
            x => this.setState({ currentUser: x })
        );
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <Navbar className="navbar-dark bg-dark" expand="lg">
                            <Container>
                                <Navbar.Brand href="/">FynApp</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                                <Navbar.Collapse id="current-user-navbar-nav" className="justify-content-end">
                                    <Navbar.Text>Signed in as:</Navbar.Text>
                                    <NavDropdown title={currentUser.firstName} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#preferences">Preferences</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute exact path="/users" component={UsersPage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 