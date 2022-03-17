// import React from 'react';
// import { Table } from 'react-bootstrap'
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

import { GenericEditor } from '../../_services/generic.editor.service';
import { WEIGHT_UNITS, HEIGHT_UNITS } from '../../_constants/users_constants';
import { UsersFoodTimes } from './UsersFoodTimes';

import { console_debug_log } from '../../_services/loging.service';

export function Users_EditorData() {
    return {
        baseUrl: 'users',
        title: 'Users',
        name: 'User',
        component: Users,
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
                readonly: false,
                listing: true
            },
            {
                name: 'height_unit',
                required: true,
                label: 'Height Unit',
                type: 'select',
                select_elements: HEIGHT_UNITS,
                readonly: false,
                listing: true
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
        ],
        childComponents: [
            {
                name: 'UsersFoodTimes'
            }
        ]
    }
}

export class Users extends GenericEditor {
    
    getEditorData() {
        return Users_EditorData();
    }

    showChildComponents(parentData, childElement) {
        console_debug_log('USERS showChildComponents | childElement.name: '+childElement.name);
        switch (childElement.name) {
            case 'UsersFoodTimes':
                return (
                    <UsersFoodTimes key="UsersFoodTimes"
                        parentData={parentData} childElementData={childElement}
                    ></UsersFoodTimes>
                );
            default:
                return ('');
        }
    }

}
