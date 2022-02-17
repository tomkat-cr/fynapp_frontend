// import React from 'react';

// import { Table } from 'react-bootstrap'
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

import { GenericEditor } from '@/_services';
import { WEIGHT_UNITS, HEIGHT_UNITS } from '@/_constants';


export function UsersEditorData() {
    return {
        baseUrl: '/users',
        title: 'Users',
        name: 'User',
        component: UsersList,
        dbApiUrl: 'users',
        fieldElements: [
            {
                name: 'id',
                required: true,
                label: 'ID',
                type: '_id',
                readonly: true
            }, 
            {
                name: 'firstname',
                required: true,
                label: 'First Name',
                type: 'text',
                readonly: false,
                listing: true
            }, 
            {
                name: 'lastname',
                required: true,
                label: 'Last Name',
                type: 'text',
                readonly: false,
                listing: true
            },
            {
                name: 'email',
                required: true,
                label: 'Email',
                type: 'email',
                readonly: false,
                listing: true
            },
            {
                name: 'training_days',
                required: true,
                label: 'Training Days',
                type: 'text',
                readonly: false
            },
            {
                name: 'training_hour',
                required: true,
                label: 'Training Hour',
                type: 'text',
                readonly: false
            },
            {
                name: 'birthday',
                required: true,
                label: 'Birthday',
                type: 'date',
                readonly: false
            },
            {
                name: 'height',
                required: true,
                label: 'Height',
                type: 'number',
                readonly: false
            },
            {
                name: 'height_unit',
                required: true,
                label: 'Height Unit',
                type: 'select',
                select_elements: HEIGHT_UNITS,
                readonly: false
            },
            {
                name: 'weight',
                required: true,
                label: 'Weight',
                type: 'number',
                readonly: false
            },
            {
                name: 'weight_unit',
                required: true,
                label: 'Weight Unit',
                type: 'select',
                select_elements: WEIGHT_UNITS,
                readonly: false
            },
            {
                name: 'creation_date',
                required: true,
                label: 'Creation Date',
                type: 'date',
                readonly: false,
                hidden: true,
                default_value: 'current_timestamp',
                listing: true
            },
        ]
    }
}

export class UsersList extends GenericEditor {
    
    getEditorData() {
        return UsersEditorData();
    }
}
