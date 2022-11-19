import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';

import { history } from '../../_helpers';
// import { console_debug_log } from '../../_services';
import { PrivateRoute } from '../../_components/Helpers/PrivateRoute';
import { authenticationService } from '../../_services';
import { HomePage } from '../../_components/HomePage/HomePage';
import { Users_EditorData } from '../SuperAdminOptions/Users';
import { FoodMoments_EditorData } from '../SuperAdminOptions/FoodMoments';
import { LoginPage } from '../../_components/LoginPage/LoginPage';
import { getPrefix } from '../../_helpers';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
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
                                <Navbar.Brand href={getPrefix()+"/"}>FynApp</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href={getPrefix()+"/"}>Home</Nav.Link>
                                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                                            { editorMenuOption(Users_EditorData()) }
                                            { editorMenuOption(FoodMoments_EditorData()) }
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                                <Navbar.Collapse id="current-user-navbar-nav" className="justify-content-end">
                                    <Navbar.Text>Signed in as:</Navbar.Text>
                                    <NavDropdown title={currentUser.firstName} id="basic-nav-dropdown">
                                        <NavDropdown.Item href={getPrefix()+"#profile"}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item href={getPrefix()+"#preferences"}>Preferences</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    }
                </div>
                <div>
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <PrivateRoute exact path={getPrefix()+"/"} component={HomePage} />
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                        <Route path="/login" component={LoginPage} />
                                        <Route path={getPrefix()+"/login"} component={LoginPage} />
                                    </div>
                                    { editorRoute(Users_EditorData()) }
                                    { editorRoute(FoodMoments_EditorData()) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}


function editorRoute(editor) {
    return (
        <div>
            <PrivateRoute exact path={getPrefix()+'/'+editor.baseUrl} component={editor.component} />
        </div>
    );
}

function editorMenuOption(editor) {
    return (
        <div>
            <NavDropdown.Item href={getPrefix()+'/'+editor.baseUrl}>{editor.title}</NavDropdown.Item>
        </div>
    );
}

export { App };