import { errorAndReEnter, getUrlParams } from '../_helpers';
import { dbApiService } from '../_services';
import { authenticationService } from '../_services';
import { console_debug_log } from './loging.service';
import {    ACTION_CREATE, 
            ACTION_READ, 
            ACTION_UPDATE, 
            ACTION_DELETE, 
            ACTION_LIST, 
            WAIT_ANIMATION_IMG, 
            MSG_ERROR_INVALID_TOKEN,
            MSG_ERROR_MISSING_ARRAY_NAME_PARAM,
            MSG_ERROR_ID_NOT_FOUND,
            MSG_DELETE_CONFIRM,
            MSG_ALT_WAIT_ANIMATION,
            MSG_ACTION_CREATE,
            MSG_ACTION_NEW,
            MSG_ACTION_READ,
            MSG_ACTION_UPDATE,
            MSG_ACTION_EDIT,
            MSG_ACTION_DELETE,
            MSG_ACTION_LIST,
            MSG_ACTION_CANCEL,
            MSG_SELECT_AN_OPTION,
        } from '../_constants';

import React from 'react';

    import { Modal } from "react-bootstrap";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Table } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faPlus, faEye, faEdit, faTrashAlt, faCheck, faList } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faPlus, faEye, faEdit, faTrashAlt, faCheck, faList);

export class GenericEditor extends React.Component {

    dbService = null;
    editor = null;

    constructor(props) {
        super(props);

        this.editor = this.getEditorData();
        this.editor.urlParams = getUrlParams(this.props);

        // Get primary key 'id' from URL query parameters
        let id = (typeof this.editor.urlParams.id === 'undefined' ? null : this.editor.urlParams.id);

        // Get 'action' from URL query parameters, defaulting it to Listing state
        let action = (typeof this.editor.urlParams.action === 'undefined' ? ACTION_LIST : this.editor.urlParams.action);

        // To cllect any error on this constructor and stop processing of this component
        let error = '';

        // Child components
        if (typeof this.editor.childComponents == 'undefined') {
            this.editor.childComponents = [];
        }
        // Primary Key parameter name for API calls
        if (typeof this.editor.primaryKeyName == 'undefined') {
            this.editor.primaryKeyName = 'id';
        }
        // Parent Key Names, for child listing
        if (typeof this.editor.parentKeyNames == 'undefined') {
            this.editor.parentKeyNames = [];
        }
        // Editor type
        if (typeof this.editor.type == 'undefined') {
            this.editor.type = 'master_listing'; // 'master_listing' | 'child_listing'
        }
        // Editor sub-type: 'array' is for arrays elements in tables of child listing
        if (typeof this.editor.subType == 'undefined') {
            this.editor.subType = 'table'; // 'array' | 'table'
        }
        // Array name for those 'array' type child listing. These elements are inside a real table.
        if (typeof this.editor.array_name == 'undefined' &&
            this.editor.subType === 'array') {
            // No default value for the array name
            // this.editor.array_name = this.editor.baseUrl
            error = MSG_ERROR_MISSING_ARRAY_NAME_PARAM; // 'Missing "array_name" parameter. It must be specified for subType "array".';
        }

        // Filters for child components
        let parentData = {};
        if(typeof this.props.parentData !== 'undefined') {
            parentData = this.props.parentData;
        }
        this.setParentData(parentData);

        // Set initial state
        this.state = this.initialState({id: id, action: action, editor: this.editor, error: error});

        this.dbService = new dbApiService({url: this.editor.dbApiUrl})

        console_debug_log('Constructor | '+ this.editor.name +' |');
        console_debug_log('this.props:');
        console_debug_log(this.props);
        console_debug_log('this.editor:');
        console_debug_log(this.editor);
    }

    getEditorData() {
        return {};
    }

    initialState(initialProps) {
        let initialState = {
            currentUser: authenticationService.currentUserValue,
            id: initialProps.id,
            action: initialProps.action,
            editor: initialProps.editor,
            error: (initialProps.error === '', null, initialProps.error),
            showModalPopUp: true
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
                    (dbObject === MSG_ERROR_INVALID_TOKEN) ? dbObject : null
        );
    } 

    setNewError(error) {
        this.setState({ 
            error: error,
        }
        , () => {
                // console_debug_log('*** setNewError - this.state.error: ' + this.state.error)
            }
        );
    }

    setNewAction(newAction, newId) {
        this.setState({ 
            action: newAction,
            id: newId
        }
        , () => {
                // console_debug_log('*** setNewAction - this.state.action: ' + this.state.action)
                // console_debug_log('*** setNewAction - this.state.id: '+this.state.id)
                if(this.state.action !== ACTION_CREATE) {
                    this.dbRetrieve(this.state);
                }
            }
        );
    }

    handleReadClick = (e) => {
        // console_debug_log('handleReadClick');
        let id = e.currentTarget.value;
        if(typeof id === 'undefined') {
            id = e.target.value;
        }
        if(typeof id === 'undefined') {
            this.setNewError(MSG_ERROR_ID_NOT_FOUND); // 'ID not found...'
        } else {
            this.setNewAction(ACTION_READ, e.currentTarget.value);
        }
    };

    handleNewClick = (e) => {
        // console_debug_log('handhandleNewClickleReadClick');
        this.setNewAction(ACTION_CREATE, null);
    };

    handleEditClick = (e) => {
        // console_debug_log('handleEditClick');
        this.setNewAction(ACTION_UPDATE, e.currentTarget.value);
    };

    handleDeleteClick = (e) => {
        // console_debug_log('handleDeleteClick');
        this.setNewAction(ACTION_DELETE, e.currentTarget.value);
    };

    handleSaveClick = (e) => {
        // console_debug_log('handleSaveClick');
        this.setNewAction('save', e.currentTarget.value);
    };

    handleCancelClick = (e) => {
        // console_debug_log('handleCancelClick');
        this.setNewAction(ACTION_LIST, null);
    };

    componentDidMount() {
        // console_debug_log('1.1 >> componentDidMount de '+this.state.editor.name+'() - id: '+this.state.id+' | action: '+this.state.action);
        this.dbRetrieve(this.state);
    }
 
    componentDidCatch() {
        // console_debug_log('1.2 >> componentDidCatch de '+this.state.editor.name+'() - id: '+this.state.id);
    }
                          
    componentWillUnmount() {
        // console_debug_log('1.4 >> componentWillUnmount de '+this.state.editor.name+'() - id: '+this.state.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console_debug_log('1.5 >> shouldComponentUpdate de '+this.state.editor.name+'() - id: '+this.state.id+' | action: '+this.state.action);

        // let refreshed = nextState.id != this.state.id || nextState.action != this.state.action || this.state.listingDataset === null;
        let refreshed = nextState !== this.state;
        if(refreshed) {
            // console_debug_log('>>-> shouldComponentUpdate = True');
            return true;
        }
        if(nextState.error) {
            // console_debug_log('>>-> shouldComponentUpdate = True por Error');
            return true;
        }
        // console_debug_log('>>-> shouldComponentUpdate = False by Default');
        return false;
    }

    dbRetrieve(newState) {
        // console_debug_log('* * * dbRetrieve of '+this.state.editor.name+' | action: '+newState.action + ' | this.state:');
        // console_debug_log(this.state);

        switch(newState.action) {

            case ACTION_READ:
            case ACTION_UPDATE:
            case ACTION_DELETE:
                let accessKeysDataScreen = {}
                accessKeysDataScreen[this.state.editor.primaryKeyName] = newState.id;
                accessKeysDataScreen = Object.assign({}, accessKeysDataScreen, this.state.editor.parentFilter);
                // console_debug_log('dbRetrieve | '+this.state.editor.name+' | GETONE - Begin... | id: '+newState.id + ' | accessKeysDataScreen: ');
                // console_debug_log(accessKeysDataScreen);
                this.dbService.getOne(accessKeysDataScreen)
                    .then(
                        currentRowDataset => this.setState({ currentRowDataset }),
                        error => this.setState({ error })
                    );
                // console_debug_log('dbRetrieve | '+this.state.editor.name+' | GETONE - End...');
                break;

            case ACTION_LIST:
                let accessKeysListing = {}
                accessKeysListing = Object.assign({}, accessKeysListing, this.state.editor.parentFilter);
                // console_debug_log('dbRetrieve | '+this.state.editor.name+' | ACTION_LIST GETALL - Begin... | accessKeysListing');
                // console_debug_log(accessKeysListing);
                this.dbService.getAll(accessKeysListing)
                    .then(
                        listingDataset => this.setState({ listingDataset }),
                        error => this.setState({ error })
                    );
                // console_debug_log('dbRetrieve | '+this.state.editor.name+' | ACTION_LIST GETALL - End...');
                this.setState({ 
                    currentRowDataset: null
                });
                break;

            default:
                // console_debug_log('dbRetrieve NOTHING...');
                break;
        }
    }

    showWaitAnimation() {
        return (
            <div>
                <center>
                    <img src={WAIT_ANIMATION_IMG} alt={MSG_ALT_WAIT_ANIMATION}/>
                </center>
            </div>
        );
    }

    render() {
        const { action, currentRowDataset, listingDataset, error } = this.state;
        let errorMessage = this.getErrorMessage(
            (action === ACTION_LIST ? listingDataset : currentRowDataset), 
            error
        );
        // console_debug_log('*/*/* '+this.state.editor.name+'-render | action: '+action+' | @--currentRowDataset: ');
        // console_debug_log(currentRowDataset);
        if (errorMessage) {
            return errorAndReEnter(errorMessage);
        }
        if (action !== ACTION_LIST && action !== ACTION_CREATE && currentRowDataset === null) {
            // console_debug_log('*/*/* '+this.state.editor.name+'-render | ESPERA # 1');
            return this.showWaitAnimation();
        }
        // console_debug_log('render() | '+this.state.editor.name+' | listingDataset:');
        // console_debug_log(listingDataset);
        if (action === ACTION_LIST &&
                (   listingDataset === null || 
                    typeof listingDataset.resultset === 'undefined' ||
                    ! Array.isArray(listingDataset.resultset)
                )
        ) {
            // console_debug_log('*/*/* '+this.state.editor.name+'-render | ESPERA # 2');
            return this.showWaitAnimation();
        }
        switch(action) {
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
        return this.editAction(MSG_ACTION_NEW, ACTION_CREATE);
    }

    readAction() {
        return this.editAction(MSG_ACTION_READ, ACTION_READ);
    }

    updateAction() {
        return this.editAction(MSG_ACTION_EDIT, ACTION_UPDATE);
    }

    deleteAction() {
        return this.editAction(MSG_ACTION_DELETE, ACTION_DELETE);
    }

    listAction() {
        const { listingDataset, error } = this.state;

        let errorMessage = this.getErrorMessage(listingDataset, error);

        // console_debug_log('listAction | listingDataset object:');
        // console_debug_log(listingDataset);
        // console_debug_log('listAction | errorMessage: ' + errorMessage);
        
        let rowIndex = 1;
        let rowId = null;

        return (
            <div>
                <h3>{this.state.editor.title + ' - ' + MSG_ACTION_LIST}</h3>
                {errorMessage &&
                    errorAndReEnter(errorMessage)
                }
                {!errorMessage && listingDataset &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th key="#">#</th>
                                {
                                    Object.entries(this.state.editor.fieldElements)
                                        .filter(function(htmlElement) {
                                            let currentObj = htmlElement[1];
                                            if(typeof currentObj.listing === 'undefined') {
                                                return false;
                                            }
                                            if(!currentObj.listing) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .map(function(htmlElement) {
                                            let currentObj = htmlElement[1];
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
                                (rowId = 
                                    (
                                        typeof dbRow._id === 'undefined' ? 
                                            dbRow[this.state.editor.primaryKeyName]
                                        :
                                            this.dbService.convertId(dbRow._id)
                                    )
                                ) && 
                                <tr key={rowId}>
                                    <td key="#">
                                        {rowIndex++}
                                    </td>
                                    {
                                        Object.entries(this.state.editor.fieldElements)
                                        .filter(function(htmlElement) {
                                            let currentObj = htmlElement[1];
                                            if(typeof currentObj.listing === 'undefined') {
                                                return false;
                                            }
                                            if(!currentObj.listing) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .map(function(htmlElement) {
                                            let currentObj = htmlElement[1];
                                            return (
                                                <td key={currentObj.name}>{ 
                                                    getSelectDescription(currentObj, dbRow)
                                                }</td>
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

        // console_debug_log('editAction | action:' + action + ' | rowId: ' + rowId);
        // console_debug_log('editAction | error: ' + error + ' | currentRowDataset object:');
        // console_debug_log(currentRowDataset);
        // console_debug_log('editAction | editorFlags object:');
        // console_debug_log(editorFlags);
        // console_debug_log('editAction | errorMessage:' + errorMessage);

        return (
            <div>
                <h3>{this.state.editor.title + ' - ' +title}</h3>
                {errorMessage &&
                    errorAndReEnter(errorMessage)
                }
                {!errorMessage && currentRowDataset && 
                    /* this.editForm_Fornik_Modal(action, currentRowDataset.resultset) */
                    this.editForm_Fornik_Final(action, currentRowDataset.resultset)
                }
                {!errorMessage && currentRowDataset && !editorFlags.isCreate &&
                    this.iterateChildComponents(currentRowDataset.resultset)
                }
            </div>
        );
    }

    setShowModalWindow(valueToSet) {
        this.setState({ 
            showModalPopUp: valueToSet,
        });
    }

    editForm_Fornik_Modal(action, dataset, message = '')  {
        
        if (this.state.editor.type !== 'child_listing') {
            return this.editForm_Fornik_Final(action, dataset, message);
        }

        // const [show, setShowModalWindow] = useState(false);
        this.setShowModalWindow(true);

        const handleClose = () => this.setShowModalWindow(false);
        // const handleShow = () => this.setShowModalWindow(true);
        const iframeTitle = this.state.editor.title + ' Popup';

        return (
            <>
                <Modal show={this.state.showModalPopUp} onHide={handleClose}>
                    <Modal.Title>{iframeTitle}</Modal.Title>
                    <Modal.Body><iframe 
                        style={{width:'100%',height:'400px'}}
                        title={iframeTitle}
                    />
                    {
                        this.editForm_Fornik_Final(action, dataset, message = '')
                    }
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleClose}>
                        Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    editForm_Fornik_Final(action, dataset, message = '')  {
        let editorFlags = this.getEditorFlags(action);
        let initialFieldValues = this.getFieldElementsDbValues(dataset);
        let rowId = initialFieldValues[this.state.editor.primaryKeyName];
        if(editorFlags.isDelete) {
            // 'Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.'
            message = (message ? '<br/>' : '') + MSG_DELETE_CONFIRM;
        }
        return (
            <Formik
                enableReinitialize={true}
                initialValues={
                    initialFieldValues
                }
                validationSchema={Yup.object().shape(
                    this.getFieldElementsRequiredYupStype(editorFlags)
                )}
                onSubmit={
                    (
                        // this.getFieldElementsListObj(),
                        submitedtElements,
                        { setStatus, setSubmitting }
                    ) => {
                        setStatus();
                        // console_debug_log('BEFORE this.dbService.createUpdateDelete(action = '+action+', rowId = '+rowId+')')
                        if(editorFlags.isCreate && 
                           typeof submitedtElements.id !== 'undefined') {
                            // Removes calculated ID
                            delete submitedtElements.id;
                        }
                        // Save the row to Database
                        this.saveRowToDatabase(
                            action,
                            rowId,
                            submitedtElements,
                            initialFieldValues
                        )
                        .then(
                            result => {
                                // console_debug_log('>>>  Formik result');
                                // console_debug_log(result);
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
                    {
                        message &&
                        <div key="AlertMessageOnTop" className={'alert alert-danger'}>{message}</div>
                    }
                    {
                        Object.entries(this.state.editor.fieldElements).map(function(htmlElement) {
                            let currentObj = htmlElement[1];
                            switch(currentObj.type) {
                                case 'select_component':
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
                                            <currentObj.component/>
                                            </Field>
                                            <ErrorMessage name={currentObj.name} component="div" className="invalid-feedback" />
                                        </div>
                                    );
                                case 'select':
                                    // let defaultElement = null; // defaultValue={((editorFlags.isCreate && !defaultElement) || (!editorFlags.isCreate && defaultElement === initialFieldValues[currentObj.name]) ? defaultElement=option.value : '')}
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
                                            {
                                                putSelectOptionsFromArray(currentObj.select_elements)
                                            }
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
                    <Table><tbody><tr>
                    {!editorFlags.isRead &&
                        <td align='left'>
                            <button 
                                key="SubmitButton"
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}>{editorFlags.isCreate ? MSG_ACTION_CREATE : editorFlags.isDelete ? MSG_ACTION_DELETE : MSG_ACTION_UPDATE}
                            </button>
                            {isSubmitting &&
                                <img src={WAIT_ANIMATION_IMG} alt={MSG_ALT_WAIT_ANIMATION}/>
                            }
                        </td>
                    }
                    <td align='left'>
                        <button 
                            key="CancelButton"
                            type="button"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            onClick={this.handleCancelClick}
                        >
                        {MSG_ACTION_CANCEL}
                        </button>
                    </td>
                    </tr></tbody></Table>
                    {status &&
                        <div className={'alert alert-danger'}>{status}</div>
                    }
                    <div/>
                </Form>
            )}
        </Formik>
        );
    }

    iterateChildComponents(dataset) {
        let initialFieldValues = this.getFieldElementsDbValues(dataset);
        let showChildComponents = this.showChildComponents;
        return Object.entries(this.state.editor.childComponents)
            .map(function(htmlElement) {
                let childElement = htmlElement[1];
                return showChildComponents(initialFieldValues, childElement);
            });
    }

    showChildComponents(parentData, childElement) {
        switch (childElement.name) {
            case 'TheChildComponent':
                return (
                    /*
                    <TheChildComponent key="TheChildComponent"
                        parentData={parentData} childElementData={childElement}
                    ></TheChildComponent>
                    */
                   ''
                );
            default:
                return ('');
        }
    }

    saveRowToDatabase(action, rowId, submitedtElements, initialValues) {
        const { editor } = this.state;
        let rowToSave = submitedtElements;
        if(editor.type === 'child_listing') {
            // Build the format for child table
            // Example:
            // {
            //     "user_id": "{{TEST_USER_ID}}",
            //     "food_times": {
            //         "food_moment_id": "test_food_moment_id_2",
            //         "food_time": "10:00"
            //     },
            //     "food_times_old": {
            //         "food_moment_id": "test_food_moment_id_1"
            //     }
            // }
            rowId = null;
            rowToSave = {};
            editor.parentKeyNames.map(keyPair => {
                rowToSave[keyPair.parameterName] = // 'user_id',
                    editor.parentData[keyPair.parentElementName] // parent table 'id'
                return null;
            });
            rowToSave[editor.array_name] = submitedtElements; // 'food_times'
            rowToSave[editor.array_name+'_old'] = initialValues; // 'food_times'
        }
        // console_debug_log('saveRowToDatabase | editor: ');
        // console_debug_log(editor);
        // console_debug_log('saveRowToDatabase | rowToSave: ');
        // console_debug_log(rowToSave);

        // Save the row to Database
        return this.dbService.createUpdateDelete(action, rowId, rowToSave);
    }


    getFieldElementsListObj() {
        let fieldElementsListObj = Object.entries(this.state.editor.fieldElements)
            .map(function(key) {
                let currentObj = key[1];
                return currentObj.name;
            }
        );
        return fieldElementsListObj
    }

    getFieldElementsDbValues(datasetRaw, defaultValues = true) {
        let dataset = {}
        if (this.state.editor.type !== 'child_listing') {
            dataset = Object.assign({}, dataset, datasetRaw);
        } else {
            if(this.state.editor.subType === 'array') {
                dataset = Object.assign({}, dataset, datasetRaw[0]);
            }
        }
        let dbService = this.dbService;
        let verifyElementExistence = this.verifyElementExistence;
        let fieldElementsListObj = {};
        Object.entries(this.state.editor.fieldElements)
            .map(function(key) {
                let currentObj = key[1];
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
        Object.entries(this.state.editor.fieldElements)
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

    setParentData(parentData) {
        let newParentFilter = {};
        this.editor.parentKeyNames.map(keyPair => 
            (
                newParentFilter[keyPair.parameterName] = 
                    parentData[keyPair.parentElementName]
            )
        );
        // console_debug_log('setParentData| '+this.editor.name+' |this.editor:');
        // console_debug_log(this.editor);
        // console_debug_log('setParentData| '+this.editor.name+' |newParentFilter: ');
        // console_debug_log(newParentFilter);
        this.editor.parentFilter = newParentFilter;
        this.editor.parentData = parentData;
    }

}

export class GenericSelectGenerator extends React.Component {

    editor = null;
    dbService = null;

    constructor(props) {
        super(props);
        this.editor = this.getEditorData();
        this.state = this.initialState();
        this.dbService = new dbApiService({url: this.editor.dbApiUrl})
    }

    getEditorData() {
        return {};
    }

    initialState() {
        return {
            db_rows: null,
            filter: (typeof this.props.filter !== 'undefined' ? this.props.filter : null),
            show_description: (typeof this.props.show_description !== 'undefined' ? this.props.show_description : false),
            editor: this.editor,
        };
    }

    componentDidMount() {
        this.dbService.getAll()
            .then( (listingDataset) => {
                // console_debug_log(this.state.editor.title+'-Select | fieldName: ' + this.props.fieldName + ' | listingDataset object:');
                // console_debug_log(listingDataset);
                this.setState({db_rows: listingDataset});
            })
            .catch( (error) => {
                console_debug_log(this.state.editor.title+'-Select | error object:');
                console_debug_log(error);
            });
    }

    render() {
        let getConvertedId = (id) => {
            if (id === null || id === '') {
                return '';
            }
            return dbService.convertId(id);
        }
        if (this.state.db_rows === null) {
            // Still not ready...
            return ('');
        }
        const emptyOption = [{ _id: null, name: MSG_SELECT_AN_OPTION}]
        const selectOptions = [
            ...emptyOption,
            ...this.state.db_rows.resultset
        ];
        let dbService = this.dbService;
        const {filter, show_description} = this.state;
        return (
            selectOptions
                .filter((option) => (
                    (filter === null ? true : dbService.convertId(option._id) === filter)
                ))
                .map((option) => {
                    if(show_description) {
                        return option.name;
                    }
                    return (
                        <option 
                            key={getConvertedId(option._id)+'_key'}
                            value={getConvertedId(option._id)}
                        >{option.name}
                        </option>
                    );
                })
        );
    }
}


export function putSelectOptionsFromArray(select_array_elements, title_field_name='title', value_field_name='value') {
    let emptyElement = {};
    emptyElement[title_field_name] = MSG_SELECT_AN_OPTION;
    emptyElement[value_field_name] = null;
    const selectOptions = [
        ...[emptyElement],
        ...select_array_elements
    ];
    return selectOptions.map((option) => (
        <option
            key={option[value_field_name]}
            value={option[value_field_name]} 
        >{option[title_field_name]}</option>
    ))
}


export function getSelectDescription(currentObj, dbRow) {
    if(currentObj.type === 'select_component') {
        return(
            <currentObj.component filter={dbRow[currentObj.name].toString()} show_description={true} />
        );
    }
    if (currentObj.type === 'select') {
        return(
            currentObj.select_elements
                .filter((option) => (option.value === dbRow[currentObj.name].toString()))
                .map((option) => option.title)
        );
    }
    return dbRow[currentObj.name].toString();
}
