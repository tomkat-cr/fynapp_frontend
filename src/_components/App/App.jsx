import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components/Helpers';
import { HomePage } from '@/_components/HomePage';
import { UsersEditorData } from '@/_components/SuperAdminOptions';
// import { GenericEditor } from '@/_components/SuperAdminOptions';
import { LoginPage } from '@/_components/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            // id: null,
            // action: null,
            // users: null,
            // user: null,
            // error: null
        };
    }

    // handleEditClick = (e) => {
    //     this.setState({
    //       id: e.target.value,
    //       action: 'edit'
    //     });
    //     console.log('handleEditClick - id: '+this.state.id+' | action: '+this.state.action);
    //   };

    // handleReadClick = (e) => {
    //     this.setState({
    //       id: e.target.value,
    //       action: 'read'
    //     });
    //     console.log('handleReadClick - id: '+this.state.id+' | action: '+this.state.action);
    //   };

    // handleDeleteClick = (e) => {
    //     this.setState({
    //       id: e.target.value,
    //       action: 'delete'
    //     });
    //     console.log('handleDeleteClick - id: '+this.state.id+' | action: '+this.state.action);
    //   };
    
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
        let usersEditorData = UsersEditorData();
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
                                    <div>
                                        <PrivateRoute exact path="/" component={HomePage} />
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                        <Route path="/login" component={LoginPage} />
                                    </div>
                                    { editorRoutes(usersEditorData) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}


function editorRoutes(editor) {
    return (
        <div>
            <PrivateRoute exact path={editor.baseUrl} component={editor.component} />
            {/* <PrivateRoute exact path={editor.baseUrl+"/:action"} component={editor.list} /> */}
            {/* <PrivateRoute exact path={editor.baseUrl+"/:action/:id"} component={editor.list} /> */}
        </div>
    );
}

export { App }; 