import { errorAndReEnter } from '../_helpers';
import { dbApiService } from '../_services';
import { authenticationService } from '../_services';
import { console_debug_log } from './loggin.service';
import {    ACTION_CREATE, 
            ACTION_READ, 
            ACTION_UPDATE, 
            ACTION_DELETE, 
            ACTION_LIST, 
            WAIT_ANIMATION_IMG, 
            INVALID_TOKEN_MSG 
        } from '../_constants';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faPlus, faEye, faEdit, faTrashAlt, faCheck, faList } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faPlus, faEye, faEdit, faTrashAlt, faCheck, faList);

export class GenericEditor extends React.Component {

    constructor(props) {
        super(props);
        
        console_debug_log('Constructor | this.props:');
        console_debug_log(this.props);

        let id = this.props.match.params.id;
        let action = this.props.match.params.action ? this.props.match.params.action : ACTION_LIST;

        console_debug_log('constructor de UsersList() id: '+id+' | action: '+action);
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
        editorFlags.isEdit = (action === ACTION_UPDATE || action === ACTION_CREATE);
        editorFlags.isCreate = (action === ACTION_CREATE);
        editorFlags.isRead = (action === ACTION_READ);
        editorFlags.isUpdate = (action === ACTION_UPDATE);
        editorFlags.isDelete = (action === ACTION_DELETE);
        return editorFlags;
    }

    getErrorMessage(dbObject, error) {
        return (
            (dbObject && dbObject.error) ? dbObject.message : 
                (error) ? error : 
                    (dbObject === INVALID_TOKEN_MSG) ? dbObject : null
        );
    } 

    setNewError(error) {
        this.setState({ 
            error: error,
        }
        , () => {
                console_debug_log('*** setNewError - this.state.error: ' + this.state.error)
            }
        );
    }

    setNewAction(newAction, newId) {
        this.setState({ 
            action: newAction,
            id: newId
        }
        , () => {
                console_debug_log('*** setNewAction - this.state.action: ' + this.state.action)
                console_debug_log('*** setNewAction - this.state.id: '+this.state.id)
                if(this.state.action !== ACTION_CREATE) {
                    this.dbRetrieve(this.state);
                }
            }
        );
    }

    handleReadClick = (e) => {
        console_debug_log('handleReadClick');
        let id = e.currentTarget.value;
        if(typeof id === 'undefined') {
            id = e.target.value;
        }
        if(typeof id === 'undefined') {
            this.setNewError('ID not found...');
        } else {
            this.setNewAction(ACTION_READ, e.currentTarget.value);
        }
    };

    handleNewClick = (e) => {
        console_debug_log('handhandleNewClickleReadClick');
        this.setNewAction(ACTION_CREATE, null);
    };

    handleEditClick = (e) => {
        console_debug_log('handleEditClick');
        this.setNewAction(ACTION_UPDATE, e.currentTarget.value);
    };

    handleDeleteClick = (e) => {
        console_debug_log('handleDeleteClick');
        this.setNewAction(ACTION_DELETE, e.currentTarget.value);
    };

    handleSaveClick = (e) => {
        console_debug_log('handleSaveClick');
        this.setNewAction('save', e.currentTarget.value);
    };

    handleCancelClick = (e) => {
        console_debug_log('handleCancelClick');
        this.setNewAction(ACTION_LIST, null);
    };

    componentDidMount() {
        console_debug_log('1.1 >> componentDidMount de UsersList() - id: '+this.state.id+' | action: '+this.state.action);
        this.dbRetrieve(this.state);
    }
 
    componentDidCatch() {
        console_debug_log('1.2 >> componentDidCatch de UsersList() - id: '+this.state.id);
    }
                          
    componentWillUnmount() {
        console_debug_log('1.4 >> componentWillUnmount de UsersList() - id: '+this.state.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console_debug_log('1.5 >> shouldComponentUpdate de UsersList() - id: '+this.state.id+' | action: '+this.state.action);

        // let refreshed = nextState.id != this.state.id || nextState.action != this.state.action || this.state.listingDataset === null;
        let refreshed = nextState !== this.state;
        if(refreshed) {
            console_debug_log('>>-> shouldComponentUpdate = True');
            return true;
        }
        if(nextState.error) {
            console_debug_log('>>-> shouldComponentUpdate = True por Error');
            return true;
        }
        console_debug_log('>>-> shouldComponentUpdate = False by Default');
        return false;
    }

    dbRetrieve(newState) {
        console_debug_log('* * * dbRetrieve | action: '+newState.action);
        switch(newState.action) {
            case ACTION_READ:
            case ACTION_UPDATE:
            case ACTION_DELETE:
                console_debug_log('dbRetrieve GETONE - Begin... | id: '+newState.id);
                this.dbService.getOne(newState.id)
                    .then(
                        currentRowDataset => this.setState({ currentRowDataset }),
                        error => this.setState({ error })
                    );
                console_debug_log('dbRetrieve GETONE - End...');
                console_debug_log(this.state.currentRowDataset);
                console_debug_log(this.state.error);
                break;
            case ACTION_LIST:
                console_debug_log('dbRetrieve GETALL - Begin...');
                this.dbService.getAll()
                    .then(
                        listingDataset => this.setState({ listingDataset }),
                        error => this.setState({ error })
                    );
                console_debug_log('dbRetrieve GETALL - End...');
                console_debug_log(this.state.listingDataset);
                console_debug_log(this.state.error);
                this.setState({ 
                    currentRowDataset: null
                });
                break;
            default:
                console_debug_log('dbRetrieve NOTHING...');
                break;
        }
    }

    render() {
        console_debug_log('*/*/* UsersList-render | action: '+this.state.action+' | @--this.state.currentRowDataset: ');
        console_debug_log(this.state.currentRowDataset);
        if (
            this.state.action !== ACTION_LIST &&
            this.state.action !== ACTION_CREATE &&
            this.state.currentRowDataset === null
        ) {
            console_debug_log('*/*/* UsersList-render | ESPERA!');
            return (
                <div>
                    <center>
                        <img src={WAIT_ANIMATION_IMG} alt="Wait..."/>
                    </center>
                </div>
            )
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

        console_debug_log('listAction | listingDataset object:');
        console_debug_log(listingDataset);
        
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
                                <th key="#">#</th>
                                {
                                    Object.entries(this.editor.fieldElements)
                                        .filter(function(htmlElemet) {
                                            let currentObj = htmlElemet[1];
                                            if(typeof currentObj.listing === 'undefined') {
                                                return false;
                                            }
                                            if(!currentObj.listing) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .map(function(htmlElemet) {
                                            let currentObj = htmlElemet[1];
                                            return (
                                <th key={currentObj.name}>{currentObj.label}</th>
                                            )
                                        })
                                }
                                <th colSpan="2"></th>
                                <td key="CreateButton">
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
                                (rowId = this.dbService.convertId(dbRow._id)) && 
                                <tr key={rowId}>
                                    <td key="#">
                                        {i++}
                                    </td>
                                    {
                                        Object.entries(this.editor.fieldElements)
                                        .filter(function(htmlElemet) {
                                            let currentObj = htmlElemet[1];
                                            if(typeof currentObj.listing === 'undefined') {
                                                return false;
                                            }
                                            if(!currentObj.listing) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .map(function(htmlElemet) {
                                            let currentObj = htmlElemet[1];
                                            return (
                                    <td key={currentObj.name}>{ dbRow[currentObj.name].toString() }</td>
                                            )
                                        })
                                    }
                                    <td key="ReadButton">
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.handleReadClick}
                                            value={rowId}
                                        >
                                        <FontAwesomeIcon icon="eye" />
                                        </button>
                                    </td>
                                    <td key="EditButton">
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.handleEditClick}
                                            value={rowId}
                                        >
                                        <FontAwesomeIcon icon="edit" />
                                        </button>
                                    </td>
                                    <td key="DeleteButton">
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

        console_debug_log('editAction | action:' + action + ' | rowId: ' + rowId);
        console_debug_log('editAction | error: ' + error + ' | currentRowDataset object:');
        console_debug_log(currentRowDataset);
        console_debug_log('editAction | editorFlags object:');
        console_debug_log(editorFlags);
        console_debug_log('editAction | errorMessage:' + errorMessage);

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
        let initialFieldValues = this.getFieldElementsDbValues(dataset);
        
console_debug_log('this.getFieldElementsListObj() = ');
console_debug_log(this.getFieldElementsListObj());
console_debug_log('this.getFieldElementsDbValues(dataset) = ');
console_debug_log(this.getFieldElementsDbValues(dataset));

        let rowId = this.getFieldElementsDbValues(dataset).id;

        if(editorFlags.isDelete) {
            message = (message ? '<br/>' : '') + 'Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.'
        }
        console_debug_log('editForm_Fornik | action:' + action + ' | rowId: ' + rowId);
        console_debug_log('editForm_Fornik | dataset object:');
        console_debug_log(dataset);
        console_debug_log('editForm_Fornik | editorFlags object:');
        console_debug_log(editorFlags);

        return (
            <Formik
                initialValues={
                    initialFieldValues
                }
                validationSchema={Yup.object().shape(
                    this.getFieldElementsRequiredYupStype(editorFlags)
                )}
                onSubmit={(
                        // this.getFieldElementsListObj(),
                        submitedtElements,
                        { setStatus, setSubmitting }
                    ) => {
                        setStatus();
                        console_debug_log('BEFORE this.dbService.createUpdateDelete(action = '+action+', rowId = '+rowId+')')
                        if(editorFlags.isCreate) {
                            delete submitedtElements.id;
                        }
                        this.dbService.createUpdateDelete(action, rowId,
                            submitedtElements
                        )
                        .then(
                            result => {
                                console_debug_log('>>>  Formik result');
                                console_debug_log(result);
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
                        <div key="AlertMessageOnTop" className={'alert alert-danger'}>{message}</div>
                    }
                    {
                        Object.entries(this.editor.fieldElements).map(function(htmlElemet) {
                            let currentObj = htmlElemet[1];
                            switch(currentObj.type) {
                                case 'select':
                                    let defaultElement = null;
                                    return (
                                        <div
                                            key={currentObj.name}
                                            className="form-group"
                                        >
                                            <label htmlFor={currentObj.name}>{currentObj.label}</label>
                                            <Field 
                                                name={currentObj.name}
                                                as="select" 
                                                disabled={!editorFlags.isEdit || (typeof currentObj.readonly !== 'undefined' && currentObj.readonly)} 
                                                className={"form-control" + (errors[currentObj.name] && touched[currentObj.name] ? ' is-invalid' : '')}
                                            >
                                            {currentObj.select_elements.map((option) => (
                                                <option
                                                    key={option.value} value={option.value} 
                                                    defaultValue={((editorFlags.isCreate && !defaultElement) || (!editorFlags.isCreate && defaultElement === initialFieldValues[currentObj.name]) ? defaultElement=option.value : '')}
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
                                        <div
                                            key={currentObj.name}
                                            className="form-group"
                                        >
                                            <label htmlFor={currentObj.name}>{currentObj.label}</label>
                                            <Field 
                                                key={currentObj.name} 
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
                            <button 
                                key="SubmitButton"
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}>{editorFlags.isCreate ? 'Create' : editorFlags.isDelete ? 'Delete' : 'Update'}
                            </button>
                            {isSubmitting &&
                                <img src={WAIT_ANIMATION_IMG} alt="Wait..."/>
                            }
                        </div>
                    }
                    <div className="form-group">
                        <button 
                            key="CancelButton"
                            type="button"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            onClick={this.handleCancelClick}
                        >
                        Cancel
                        </button>
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
                // } else if(currentObj.type === '_id') {
                //     if(verifyElementExistence(dataset, '_'+currentObj.name)) {
                //         fieldElementsListObj[currentObj.name] = dbService.convertId(dataset['_'+currentObj.name])
                //     } else if(defaultValues) {
                //         fieldElementsListObj[currentObj.name] = 0;
                //     }
                // } else if(defaultValues) {
                //     fieldElementsListObj[currentObj.name] = (currentObj.type === 'number' ? 0 : '');
                // }
                if(currentObj.type === '_id') {
                    if(verifyElementExistence(dataset, '_'+currentObj.name)) {
                        fieldElementsListObj[currentObj.name] = dbService.convertId(dataset['_'+currentObj.name])
                    } else if(defaultValues) {
                        fieldElementsListObj[currentObj.name] = 0;
                    }
                } else if(verifyElementExistence(dataset, currentObj.name)) {
                    fieldElementsListObj[currentObj.name] = dataset[currentObj.name];
                } else if(defaultValues) {
                    fieldElementsListObj[currentObj.name] = (currentObj.type === 'number' ? 0 : '');
                }
                return null;
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
                return null;
            }
        );
        return fieldElementsListObj
    }

}
