import config from 'config';
import { authHeader, handleResponse, handleFetchError } from '@/_helpers';
import {
    ACTION_CREATE, 
    ACTION_UPDATE, 
    ACTION_DELETE, 
} from '@/_constants';

export class dbApiService {
    
    constructor(props) {
        this.props = props;
     
        this.props.authHeader = authHeader();
        this.props.authAndJsonHeader = Object.assign(
            {}, 
            { 'Content-Type': 'application/json' }, 
            this.props.authHeader
        );
    }

    props = null;

    getAll() {
        const requestOptions = { method: 'GET', headers: this.props.authHeader };
        let response = fetch(`${config.apiUrl}/${this.props.url}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    getOne(id) {
        console.log('dbServices::getOne() - id: '+id);
        const requestOptions = { method: 'GET', headers: this.props.authHeader };
        let response = fetch(`${config.apiUrl}/${this.props.url}?id=${id}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    createUpdateDelete(action, id, data) {
        switch(action) {
            case ACTION_CREATE:
                return this.createRow(data);
            case ACTION_UPDATE:
                return this.updateRow(id, data)
            case ACTION_DELETE:
                return this.deleteRow(id)    
            default:
                return handleFetchError('Error CUD-1 - Invalid action: '+action)
        }
    }

    createRow(data) {
        console.log('dbServices::createRow() - data:');
        console.log(data);
        console.log('dbServices::createRow() - this.props.authAndJsonHeader:');
        console.log(this.props.authAndJsonHeader);

        const requestOptions = { 
            method: 'POST',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        let response = fetch(`${config.apiUrl}/${this.props.url}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    updateRow(id, data) {
        data.id = id;
        console.log('dbServices::updateRow() - id: '+id+' | data:');
        console.log(data);
        const requestOptions = { 
            method: 'PUT',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        let response = fetch(`${config.apiUrl}/${this.props.url}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    deleteRow(id) {
        console.log('dbServices::deleteRow() - id: '+id);
        const requestOptions = { method: 'DELETE', headers: this.props.authHeader };
        let response = fetch(`${config.apiUrl}/${this.props.url}?id=${id}`, requestOptions)
                .then(handleResponse, handleFetchError);
        return response;
    }

    convertId(id) {
        return id.$oid;
    }
}

/*
export const userService = {
    getAll,
    getOne,
    createRow,
    updateRow,
    deleteRow,
    convertId
};

function getAll() {
    const requestOptions = { method: 'GET', headers: this.props.authHeader };
    let response = fetch(`${config.apiUrl}/users`, requestOptions)
            .then(handleResponse, handleFetchError);
    return response;
}

function getOne(id) {
    console.log('UserServices::getOne() - id: '+id);
    const requestOptions = { method: 'GET', headers: this.props.authHeader };
    let response = fetch(`${config.apiUrl}/users?id=${id}`, requestOptions)
            .then(handleResponse, handleFetchError);
    return response;
}

function createRow(data) {
    console.log('UserServices::createRow() - data:');
    console.log(data);
    const requestOptions = { method: 'POST', headers: this.props.authHeader, data: data };
    let response = fetch(`${config.apiUrl}/users`, requestOptions)
            .then(handleResponse, handleFetchError);
    return response;
}

function updateRow(id, data) {
    data.id = id;
    console.log('UserServices::updateRow() - id: '+id+' | data:');
    console.log(data);
    const requestOptions = { method: 'PUT', headers: this.props.authHeader, data: data };
    let response = fetch(`${config.apiUrl}/users`, requestOptions)
            .then(handleResponse, handleFetchError);
    return response;
}

function deleteRow(id) {
    console.log('UserServices::deleteRow() - id: '+id);
    const requestOptions = { method: 'DELETE', headers: this.props.authHeader };
    let response = fetch(`${config.apiUrl}/users?id=${id}`, requestOptions)
            .then(handleResponse, handleFetchError);
    return response;
}

function convertId(id) {
    return id.$oid;
}
*/