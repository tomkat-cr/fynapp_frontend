import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

export class GenericEditor extends React.Component {

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

    getEditorData() {
        return {};
    }

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
                          
    componentWillUnmount() {
        console.log('1.4 >> componentWillUnmount de UsersList() - id: '+this.state.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('1.5 >> shouldComponentUpdate de UsersList() - id: '+this.state.id+' | action: '+this.state.action);

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
                                {
                                    Object.entries(this.editor.fieldElements).map(function(htmlElemet) {
                                        let currentObj = htmlElemet[1];
                                        if(typeof currentObj.listing == 'undefined') {
                                            return; 
                                        }
                                        if(!currentObj.listing) {
                                            return; 
                                        }
                                        return (
                                <th>{currentObj.label}</th>
                                        )
                                    })
                                }
                                <th colSpan="2"></th>
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
                            {listingDataset.resultset.map(dbRow => 
                                <tr key={rowId = this.dbService.convertId(dbRow._id)}>
                                    <td>
                                        <a onClick={this.handleReadClick} value={rowId}>
                                        {i++}
                                        </a>
                                    </td>
                                    {
                                        Object.entries(this.editor.fieldElements).map(function(htmlElemet) {
                                            let currentObj = htmlElemet[1];
                                            if(typeof currentObj.listing == 'undefined') {
                                                return; 
                                            }
                                            if(!currentObj.listing) {
                                                return; 
                                            }
                                            return (
                                    <td>{ dbRow[currentObj.name].toString() }</td>
                                            )
                                        })
                                    }
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.handleReadClick}
                                            value={rowId}
                                        >
                                        <FontAwesomeIcon icon="eye" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.handleEditClick}
                                            value={rowId}
                                        >
                                        <FontAwesomeIcon icon="edit" />
                                        </button>
                                    </td>
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

    editAction(title, action) {

        let editorFlags = this.getEditorFlags(action);

        let currentRowDataset = {
            resultset: this.getFieldElementsDbValues({})
        };
        let error = null;
        let errorMessage = null;
        let rowId = null;

        if(!editorFlags.isCreate) {
            currentRowDataset = this.state.currentRowDataset;
            error = this.state.error;
            errorMessage = this.getErrorMessage(currentRowDataset, error);
            rowId = this.getFieldElementsDbValues(currentRowDataset.resultset).id;        
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
                {!errorMessage && currentRowDataset && this.editForm_Fornik(action, currentRowDataset.resultset)
                }
            </div>
        );
    }

    editForm_Fornik(action, dataset, message = '')  {
        
        let editorFlags = this.getEditorFlags(action);
        let htmlElemetArray = null;
        
console.log('this.getFieldElementsListObj() = ');
console.log(this.getFieldElementsListObj());
console.log('this.getFieldElementsDbValues(dataset) = ');
console.log(this.getFieldElementsDbValues(dataset));

        let rowId = this.getFieldElementsDbValues(dataset).id;

        if(editorFlags.isDelete) {
            message = (message ? '<br/>' : '') + 'Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.'
        }
        console.log('editForm_Fornik | action:' + action + ' | rowId: ' + rowId);
        console.log('editForm_Fornik | dataset object:');
        console.log(dataset);
        console.log('editForm_Fornik | editorFlags object:');
        console.log(editorFlags);

        return (
            <Formik
            initialValues={
                this.getFieldElementsDbValues(dataset)
            }
            validationSchema={Yup.object().shape(
                this.getFieldElementsRequiredYupStype(editorFlags)
            )}
            onSubmit={(
                    // this.getFieldElementsListObj(),
                    submitedtElements,
                    // { 
                    //     firstname, 
                    //     lastname,
                    //     email,
                    //     training_days,
                    //     training_hour,
                    //     birthday,
                    //     height,
                    //     height_unit,
                    //     weight,
                    //     weight_unit,
                    //     creation_date,
                    // }, 
                    { setStatus, setSubmitting }
                ) => {
                    setStatus();
                    console.log('BEFORE this.dbService.createUpdateDelete(action = '+action+', rowId = '+rowId+')')
                    if(editorFlags.isCreate) {
                        delete submitedtElements.id;
                    }
                    this.dbService.createUpdateDelete(action, rowId,
                        submitedtElements
                        // {
                        //     firstname, 
                        //     lastname,
                        //     email,
                        //     training_days,
                        //     training_hour,
                        //     birthday,
                        //     height,
                        //     height_unit,
                        //     weight,
                        //     weight_unit,
                        //     creation_date,
                        // }
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
                {
                    Object.entries(this.editor.fieldElements).map(function(htmlElemet) {
                        let currentObj = htmlElemet[1];
                        // if(editorFlags.isCreate && currentObj.name == 'id') {
                        //     return;
                        // }
                        switch(currentObj.type) {
                            case 'select':
                                let defaultElement = null;
                                return (
                                    <div className="form-group">
                                        <Field 
                                            name={currentObj.name}
                                            as="select" 
                                            disabled={!editorFlags.isEdit || (typeof currentObj.readonly !== 'undefined' && currentObj.readonly)} 
                                            className={"form-control" + (errors[currentObj.name] && touched[currentObj.name] ? ' is-invalid' : '')}
                                        >
                                        {currentObj.select_elements.map((option) => (
                                            <option
                                                key={option.value} value={option.title} 
                                                selected={(!defaultElement ? defaultElement='selected' : '')}
                                            >
                                                {option.title}
                                            </option>
                                        ))}
                                        </Field>
                                        <ErrorMessage name={currentObj.name} component="div" className="invalid-feedback" />
                                    </div>
                                );
                            case 'text':
                            case 'number':
                            case 'date':
                            case 'email':
                            default:                                
                                return (
                                    <div className="form-group">
                                        <label htmlFor={currentObj.name}>{currentObj.label}</label>
                                        <Field 
                                            name={currentObj.name} 
                                            type={currentObj.type} 
                                            disabled={!editorFlags.isEdit || (typeof currentObj.readonly !== 'undefined' && currentObj.readonly)} 
                                            className={"form-control" + (errors[currentObj.name] && touched[currentObj.name] ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name={currentObj.name} component="div" className="invalid-feedback" />
                                    </div>
                                )
                        }
                    })
                }
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

    getFieldElementsListObj() {
        let fieldElementsListObj = Object.entries(this.editor.fieldElements)
            .map(function(key) {
                let currentObj = key[1];
                return currentObj.name;
            }
        );
        return fieldElementsListObj
    }

    getFieldElementsDbValues(dataset, defaultValues = true) {
        let dbService = this.dbService;
        let verifyElementExistence = this.verifyElementExistence;
        let fieldElementsListObj = {};
        Object.entries(this.editor.fieldElements)
            .map(function(key) {
                let currentObj = key[1];
                // if(verifyElementExistence(dataset, currentObj.name)) {
                //     fieldElementsListObj[currentObj.name] = dataset[currentObj.name];
                // } else if(currentObj.type == '_id') {
                //     if(verifyElementExistence(dataset, '_'+currentObj.name)) {
                //         fieldElementsListObj[currentObj.name] = dbService.convertId(dataset['_'+currentObj.name])
                //     } else if(defaultValues) {
                //         fieldElementsListObj[currentObj.name] = 0;
                //     }
                // } else if(defaultValues) {
                //     fieldElementsListObj[currentObj.name] = (currentObj.type == 'number' ? 0 : '');
                // }
                if(currentObj.type == '_id') {
                    if(verifyElementExistence(dataset, '_'+currentObj.name)) {
                        fieldElementsListObj[currentObj.name] = dbService.convertId(dataset['_'+currentObj.name])
                    } else if(defaultValues) {
                        fieldElementsListObj[currentObj.name] = 0;
                    }
                } else if(verifyElementExistence(dataset, currentObj.name)) {
                    fieldElementsListObj[currentObj.name] = dataset[currentObj.name];
                } else if(defaultValues) {
                    fieldElementsListObj[currentObj.name] = (currentObj.type == 'number' ? 0 : '');
                }
            }
        );
        return fieldElementsListObj
    }

    verifyElementExistence(dataset, element) {
        let existsInDataset = (typeof dataset[element] !== 'undefined');
        return existsInDataset;
    }

    getFieldElementsRequiredYupStype(editorFlags) {
        if(editorFlags.isDelete) {
            return {};
        }
        let fieldElementsListObj = {};
        Object.entries(this.editor.fieldElements)
            .map(function(key) {
                let currentObj = key[1];
                if(currentObj.required) {
                    fieldElementsListObj[currentObj.name] = Yup.string().required(
                        currentObj.label + ' is required'
                    )
                }
            }
        );
        return fieldElementsListObj
    }

}
