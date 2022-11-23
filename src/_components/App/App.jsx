import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';

import { history } from '../../_helpers';
// import { console_debug_log } from '../../_services';
// import { PrivateRoute } from '../../_components/Helpers/PrivateRoute';
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
        history.push(getPrefix(true)+'/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <>
                <div>
                    {currentUser &&
                        <Navbar className="navbar-dark bg-dark" expand="lg">
                            <Container>
                                <Navbar.Brand as={RouterLink} to={getPrefix()+"/"}>FynApp</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link as={RouterLink} to={getPrefix()+"/"}>Home</Nav.Link>
                                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                                            { editorMenuOption(Users_EditorData()) }
                                            { editorMenuOption(FoodMoments_EditorData()) }
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                                <Navbar.Collapse id="current-user-navbar-nav" className="justify-content-end">
                                    <Navbar.Text>Signed in as:</Navbar.Text>
                                    <NavDropdown title={currentUser.firstName} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={RouterLink} to={getPrefix()+"#profile"}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item as={RouterLink} to={getPrefix()+"#preferences"}>Preferences</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={RouterLink} to={getPrefix()+'/login'} onClick={this.logout}>Logout</NavDropdown.Item>
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
                                    {/* <Routes history={history} baseUrl={process.env.REACT_APP_URI_PREFIX}> */}
                                    <Routes history={history}>
                                        <>
                                            <Route path="/" element={<HomePage/>} />
                                            <Route path={getPrefix(true)+"/"} element={<HomePage/>} />
                                            <Route path={getPrefix()+"/login"} element={<LoginPage/>} />
                                            { editorRoute(Users_EditorData()) }
                                            { editorRoute(FoodMoments_EditorData()) }
                                        </>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


function editorRoute(editor) {
    return (
        <Route path={getPrefix()+'/'+editor.baseUrl} element={<editor.component/>} />
    );
}

function editorMenuOption(editor) {
    return (
        <>
            <NavDropdown.Item as={RouterLink} to={getPrefix()+'/'+editor.baseUrl}>{editor.title}</NavDropdown.Item>
            {/* <RouterLink to={getPrefix()+'/'+editor.baseUrl}>{editor.title}</RouterLink> */}
        </>
    );
}

export { App };