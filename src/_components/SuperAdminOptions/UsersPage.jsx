import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import { Table, Button } from 'semantic-ui-react';
import { Table } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faPlus, faEye, faEdit, faTrashAlt, faCheck, faList } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faPlus, faEye, faEdit, faTrashAlt, faCheck, faList);

import { dbApiService, authenticationService } from '@/_services';
import { errorAndReEnter } from '@/_helpers';
import {    ACTION_CREATE, 
            ACTION_READ, 
            ACTION_UPDATE, 
            ACTION_DELETE, 
            ACTION_LIST, 
            WAIT_ANIMATION_IMG, 
            INVALID_TOKEN_MSG 
        } from '@/_constants';

export function UsersEditorData() {
    return {
        baseUrl: '/users',
        title: 'Users',
        name: 'User',
        component: UsersList,
        dbApiUrl: 'users',
    }
}

export class UsersList extends React.Component {

    getEditorData() {
        return UsersEditorData();
    }

    constructor(props) {
        super(props);

        console.log('Constructor | this.props:');
        console.log(this.props);

        let id = this.props.match.params.id;
        let action = this.props.match.params.action ? this.props.match.params.action : ACTION_LIST;

        console.log('constructor de UsersList() id: '+id+' | action: '+action);
        this.state = this.initialState({id: id, action: action});

        this.editor = this.getEditorData();

        this.dbService = new dbApiService({url: this.editor.dbApiUrl})
    }

    dbService = null;

    initialState(initialProps) {
        let initialState = {
            currentUser: authenticationService.currentUserValue,
            id: initialProps.id,
            action: initialProps.action,
            error: null
        };
        initialState.listingDataset = null;
        initialState.currentRowDataset = null;
        return initialState;
    }

    getErrorMessage(dbObject, error) {
        return (
            (dbObject && dbObject.error) ? dbObject.message : 
                (error) ? error : 
                    (dbObject == INVALID_TOKEN_MSG) ? dbObject : null
        );
    } 

    setNewError(error) {
        this.setState({ 
            error: error,
        }
        , () => {
                console.log('*** setNewError - this.state.error: ' + this.state.error)
            }
        );
    }

    setNewAction(newAction, newId) {
        this.setState({ 
            action: newAction,
            id: newId
        }
        , () => {
                console.log('*** setNewAction - this.state.action: ' + this.state.action)
                console.log('*** setNewAction - this.state.id: '+this.state.id)
                if(this.state.action != ACTION_CREATE) {
                    this.dbRetrieve(this.state);
                }
            }
        );
    }

    handleReadClick = (e) => {
        console.log('handleReadClick');
        let id = e.currentTarget.value;
        if(typeof id == 'undefined') {
            id = e.target.value;
        }
        if(typeof id == 'undefined') {
            this.setNewError('ID not found...');
        } else {
            this.setNewAction(ACTION_READ, e.currentTarget.value);
        }
    };

    handleNewClick = (e) => {
        console.log('handhandleNewClickleReadClick');
        this.setNewAction(ACTION_CREATE, null);
    };

    handleEditClick = (e) => {
        console.log('handleEditClick');
        this.setNewAction(ACTION_UPDATE, e.currentTarget.value);
    };

    handleDeleteClick = (e) => {
        console.log('handleDeleteClick');
        this.setNewAction(ACTION_DELETE, e.currentTarget.value);
    };

    handleSaveClick = (e) => {
        console.log('handleSaveClick');
        this.setNewAction('save', e.currentTarget.value);
    };

    handleCancelClick = (e) => {
        console.log('handleCancelClick');
        this.setNewAction(ACTION_LIST, null);
    };

    componentDidMount() {
        console.log('1.1 >> componentDidMount de UsersList() - id: '+this.state.id+' | action: '+this.state.action);
        this.dbRetrieve(this.state);
    }
 
    componentDidCatch() {
        console.log('1.2 >> componentDidCatch de UsersList() - id: '+this.state.id);
    }
             
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('1.3 >> componentDidUpdate de UsersList()');
    //     console.log('this.state');
    //     console.log(this.state);
    //     console.log('prevState');
    //     console.log(prevState);
    //     console.log('this.props');
    //     console.log(this.props);
    //     console.log('prevProps');
    //     console.log(prevProps);
    //     // let refreshed = id != this.state.id || action != this.state.action;
    //     // let refreshed = this.props.history.location.pathname != this.props.location.pathname;

    //     // let refreshed = prevState.id != this.state.id || prevState.action != this.state.action;
    //     // if(refreshed) {
    //         this.dbRetrieve(this.state);
    //     // }
    // }
             
    componentWillUnmount() {
        console.log('1.4 >> componentWillUnmount de UsersList() - id: '+this.state.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('1.5 >> shouldComponentUpdate de UsersList() - id: '+this.state.id+' | action: '+this.state.action);
        // console.log('this.state');
        // console.log(this.state);
        // console.log('nextState');
        // console.log(nextState);
        // console.log('this.props');
        // console.log(this.props);
        // console.log('nextProps');
        // console.log(nextProps);

        // let refreshed = nextState.id != this.state.id || nextState.action != this.state.action || this.state.listingDataset == null;
        let refreshed = nextState != this.state;
        if(refreshed) {
            console.log('>>-> shouldComponentUpdate = True');
            return true;
        }
        if(nextState.error) {
            console.log('>>-> shouldComponentUpdate = True por Error');
            return true;
        }
        console.log('>>-> shouldComponentUpdate = False by Default');
        return false;
    }

    dbRetrieve(newState) {
        console.log('* * * dbRetrieve | action: '+newState.action);
        switch(newState.action) {
            case ACTION_READ:
            case ACTION_UPDATE:
            case ACTION_DELETE:
                console.log('dbRetrieve GETONE - Begin... | id: '+newState.id);
                this.dbService.getOne(newState.id)
                    .then(
                        currentRowDataset => this.setState({ currentRowDataset }),
                        error => this.setState({ error })
                    );
                console.log('dbRetrieve GETONE - End...');
                console.log(this.state.currentRowDataset);
                console.log(this.state.error);
                break;
            case ACTION_LIST:
                console.log('dbRetrieve GETALL - Begin...');
                this.dbService.getAll()
                    .then(
                        listingDataset => this.setState({ listingDataset }),
                        error => this.setState({ error })
                    );
                console.log('dbRetrieve GETALL - End...');
                console.log(this.state.listingDataset);
                console.log(this.state.error);
                this.setState({ 
                    currentRowDataset: null
                });
                break;
            default:
                console.log('dbRetrieve NOTHING...');
                break;
        }
    }

    render() {
        console.log('*/*/* UsersList-render | action: '+this.state.action+' | @--this.state.currentRowDataset: ');
        console.log(this.state.currentRowDataset);
        if (
            this.state.action != ACTION_LIST &&
            this.state.action != ACTION_CREATE &&
            this.state.currentRowDataset === null
        ) {
            console.log('*/*/* UsersList-render | ESPERA!');
            return null
        }
        switch(this.state.action) {
            case ACTION_READ:
                return this.readAction()
            case ACTION_CREATE:
                return this.newAction()
            case ACTION_UPDATE:
                return this.updateAction()
            case ACTION_DELETE:
                return this.deleteAction()
            case ACTION_LIST:
                return this.listAction()
            default:
                break;
        }
    }

    newAction() {
        return this.editAction('New', ACTION_CREATE);
    }

    readAction() {
        return this.editAction('View', ACTION_READ);
    }

    updateAction() {
        return this.editAction('Edit', ACTION_UPDATE);
    }

    deleteAction() {
        return this.editAction('Delete', ACTION_DELETE);
    }

    listAction() {
        const { listingDataset, error } = this.state;

        let errorMessage = this.getErrorMessage(listingDataset, error);

        console.log('listAction | listingDataset object:');
        console.log(listingDataset);
        
        let i = 1;
        let rowId = null;

        return (
            <div>
                <h3>{this.editor.title}</h3>
                {errorMessage &&
                    errorAndReEnter(errorMessage)
                }
                {!errorMessage && listingDataset &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th colSpan="2"></th>
                                {/* <th><Link to={this.editor.baseUrl+"/new"}><FontAwesomeIcon icon="plus" /></Link></th> */}
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.handleNewClick}
                                    >
                                    <FontAwesomeIcon icon="plus" />
                                    </button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {listingDataset.resultset.map(user => 
                                <tr key={rowId = this.dbService.convertId(user._id)}>
                                {/* <td><Link to={{pathname: this.editor.baseUrl+"/read/"+rowId, state: {action: ACTION_READ, id: rowId}}} >{i++}</Link></td> */}
                                <td>
                                    <a
                                        onClick={this.handleReadClick}
                                        value={rowId}
                                    >
                                    {i++}
                                    </a>
                                </td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                {/* <td><Link to={{pathname: this.editor.baseUrl+"/read/"+rowId, state: {action: ACTION_READ, id: rowId}}} ><FontAwesomeIcon icon="eye" /></Link></td> */}
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.handleReadClick}
                                        value={rowId}
                                    >
                                    <FontAwesomeIcon icon="eye" />
                                    </button>
                                </td>
                                {/* <td><Link to={{state: {action: ACTION_UPDATE, id: rowId}}} ><FontAwesomeIcon icon="edit" /></Link></td> */}
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.handleEditClick}
                                        value={rowId}
                                    >
                                    <FontAwesomeIcon icon="edit" />
                                    </button>
                                </td>
                                {/* <td><Link to={{state: {action: ACTION_DELETE, id: rowId}}} ><FontAwesomeIcon icon="trash-alt" /></Link></td> */}
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.handleDeleteClick}
                                        value={rowId}
                                    >
                                    <FontAwesomeIcon icon="trash" />
                                    </button>
                                </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                }
            </div>
        );
    }

/*
<td><Link to={this.editor.baseUrl+"/read/"+rowId}><FontAwesomeIcon icon="eye" /></Link></td>
<td><Link to={this.editor.baseUrl+"/update/"+rowId}><FontAwesomeIcon icon="edit" /></Link></td>
<td><Link to={this.editor.baseUrl+"/remove/"+rowId}><FontAwesomeIcon icon="trash-alt" /></Link></td>
*/

    getEditorFlags(actionCapitalized) {
        let action = actionCapitalized.toString().toLowerCase();
        let editorFlags = {};
        editorFlags.isEdit = (action == ACTION_UPDATE || action == ACTION_CREATE);
        editorFlags.isCreate = (action == ACTION_CREATE);
        editorFlags.isRead = (action == ACTION_READ);
        editorFlags.isUpdate = (action == ACTION_UPDATE);
        editorFlags.isDelete = (action == ACTION_DELETE);
        return editorFlags;
    }

//     editAction123(title, action) {
//         const { currentRowDataset, error } = this.state;

//         // let errorMessage = ((currentRowDataset && currentRowDataset.error) ? currentRowDataset.message : error ? error : null);
//         let errorMessage = this.getErrorMessage(currentRowDataset, error);

// console.log('readAction | currentRowDataset object:');
// console.log(currentRowDataset);

//         let editorFlags = this.getEditorFlags(action);
//         let rowId = this.dbService.convertId(currentRowDataset.resultset._id);

//         return (
//             <div>
//                 <h3>{this.editor.title + ' - ' +title}</h3>
//                 {errorMessage &&
//                     errorAndReEnter(errorMessage)
//                 }
//                 {!errorMessage && currentRowDataset &&
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th colSpan="2">
//                                     <Table striped bordered hover>
//                                         <tbody>
//                                             <tr>
//                                                 <td>
//                                                     <button
//                                                         className="btn btn-primary"
//                                                         onClick={this.handleNewClick}
//                                                     >
//                                                         <FontAwesomeIcon icon="plus" />
//                                                     </button>
//                                                 </td>
//                                                 <td>
//                                                     <button
//                                                         className="btn btn-primary"
//                                                         onClick={this.handleEditClick}
//                                                         value={rowId}
//                                                     >
//                                                         <FontAwesomeIcon icon="edit" />
//                                                     </button>
//                                                 </td>
//                                                 <td>
//                                                     <button
//                                                         className="btn btn-primary"
//                                                         onClick={this.handleDeleteClick}
//                                                         value={rowId}
//                                                     >
//                                                         <FontAwesomeIcon icon="trash" />
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </Table>
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                             <td>ID</td>
//                             <td>{rowId}</td>
//                             </tr>
//                             <tr>
//                             <td>First Name</td>
//                             <td>
//                                 <input
//                                     type="text"
//                                     name="firstname"
//                                     defaultValue={currentRowDataset.resultset.firstname}
//                                     // value={currentRowDataset.resultset.firstname}
//                                     // readOnly={(!editorFlags.isEdit)}
//                                     onChange={this.setFieldValue}
//                                 />
//                             </td>
//                             </tr>
//                             <tr>
//                             <td>Last Name</td>
//                             {/* <td>{currentRowDataset.resultset.lastname}</td> */}
//                             <td>
//                                 <input
//                                     type="text"
//                                     name="lastname"
//                                     defaultValue={currentRowDataset.resultset.lastname}
//                                     onChange={this.setFieldValue}
//                                     />
//                             </td>
//                             </tr>
//                             <tr>
//                             <td>Username</td>
//                             {/* <td>{currentRowDataset.resultset.email}</td> */}
//                             <td>
//                                 <input
//                                     type="text"
//                                     name="email"
//                                     defaultValue={currentRowDataset.resultset.email}
//                                     onChange={this.setFieldValue}
//                                     />
//                             </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     {editorFlags.isEdit &&

//                                         <button
//                                         className="btn btn-primary"
//                                         onClick={this.handleSaveClick}
//                                         value={rowId}
//                                         >
//                                         <FontAwesomeIcon icon="check" />
//                                         </button>
//                                     }
//                                 </td>
//                                 <td>
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={this.handleCancelClick}
//                                         value={rowId}
//                                     >
//                                     <FontAwesomeIcon icon="list" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </Table>
//                 }
//             </div>
//         );
//     }

    editAction(title, action) {

        let editorFlags = this.getEditorFlags(action);

        let currentRowDataset = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
            }
        };
        let error = null;
        let errorMessage = null;
        let rowId = null;

        if(!editorFlags.isCreate) {
            currentRowDataset = this.state.currentRowDataset;
            error = this.state.error;
            errorMessage = this.getErrorMessage(currentRowDataset, error);
            rowId = (currentRowDataset && !errorMessage) ? this.dbService.convertId(currentRowDataset.resultset._id) : null;
        }

        console.log('editAction | action:' + action + ' | rowId: ' + rowId);
        console.log('editAction | error: ' + error + ' | currentRowDataset object:');
        console.log(currentRowDataset);
        console.log('editAction | editorFlags object:');
        console.log(editorFlags);
        console.log('editAction | errorMessage:' . errorMessage);

        return (
            <div>
                <h3>{this.editor.title + ' - ' +title}</h3>
                {errorMessage &&
                    errorAndReEnter(errorMessage)
                }
                {!errorMessage && currentRowDataset && this.editForm_Fornik(action, currentRowDataset.resultset, rowId)
                }
            </div>
        );
    }

    editForm_Fornik(action, dataset, rowId, message = '')  {
        
        let editorFlags = this.getEditorFlags(action);

        if(editorFlags.isDelete) {
            message = (message ? '<br/>' : '') + 'Are you sure to delete this element? Please confirm with the [Delete] button...'
        }
        console.log('editForm_Fornik | action:' + action + ' | rowId: ' + rowId);
        console.log('editForm_Fornik | dataset object:');
        console.log(dataset);
        console.log('editForm_Fornik | editorFlags object:');
        console.log(editorFlags);

        return (
            <Formik
            initialValues={{
                id: rowId,
                firstname: dataset.firstname,
                lastname: dataset.lastname,
                email: dataset.email,
            }}
            validationSchema={Yup.object().shape({
                firstname: Yup.string().required('First name is required'),
                lastname: Yup.string().required('Last name is required'),
                email: Yup.string().required('Email is required'),
            })}
            onSubmit={(
                    { 
                        firstname, 
                        lastname,
                        email
                    }, 
                    { setStatus, setSubmitting }
                ) => {
                setStatus();
                this.dbService.createUpdateDelete(action, rowId,
                        { 
                            firstname, 
                            lastname,
                            email
                        }
                    )
                    .then(
                        result => {
                            console.log('|||||\\\\\ Formik result');
                            console.log(result);
                            if(result && result.error) {
                                setSubmitting(false);
                                setStatus(result);
                            } else {
                                this.setNewAction(ACTION_LIST, null);
                            }
                        },
                        error => {
                            setSubmitting(false);
                            setStatus(error);
                        }
                    );
            }}
        >{({ errors, status, touched, isSubmitting }) => (
            <Form>
                {message &&
                    <div className={'alert alert-danger'}>{message}</div>
                }
                {!editorFlags.isCreate &&
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <Field name="id" type="text" disabled={true} className={'form-control'} />
                        <ErrorMessage name="id" component="div" className="invalid-feedback" />
                    </div>
                }
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <Field name="firstname" type="text" disabled={!editorFlags.isEdit} className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <Field name="lastname" type="text" disabled={!editorFlags.isEdit} className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                    <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" disabled={!editorFlags.isEdit} className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                {!editorFlags.isRead &&
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{editorFlags.isCreate ? 'Create' : editorFlags.isDelete ? 'Delete' : 'Update'}</button>
                        {isSubmitting &&
                            <img src={WAIT_ANIMATION_IMG} />
                        }
                    </div>
                }
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={isSubmitting} onClick={this.handleCancelClick} >Cancel</button>
                </div>
                {status &&
                    <div className={'alert alert-danger'}>{status}</div>
                }
            </Form>
        )}
        </Formik>

        );
    }

}
