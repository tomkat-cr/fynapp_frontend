import { GenericEditor } from '../../_services/generic.editor.service';
import { WEIGHT_UNITS } from '../../_constants/users_constants';


export function UsersUserHistory_EditorData() {
    return {
        baseUrl: 'user_history',
        title: 'User History',
        name: 'User History',
        component: UsersUserHistory,
        dbApiUrl: 'users/user-user-history',

        type: 'child_listing',
        subType: 'array', // 'array' | 'table'
        array_name: 'user_history',
        parentKeyNames: [
            {
                parameterName: 'user_id',
                parentElementName: 'id'
            }
        ],
        primaryKeyName: 'date',

        fieldElements: [
            {
                name: 'date',
                label: 'Date',
                required: true,
                type: 'date',
                listing: true,
            }, 
            {
                name: 'goals',
                required: true,
                label: 'Goals',
                type: 'text',
                readonly: false,
                listing: true,
            }, 
            {
                name: 'weight',
                required: true,
                label: 'Weight',
                type: 'number',
                readonly: false,
                listing: true,
            },
            {
                name: 'weight_unit',
                required: true,
                label: 'Weight Unit',
                type: 'select',
                select_elements: WEIGHT_UNITS,
                readonly: false,
                listing: true,
            },
        ]
    }
}


export class UsersUserHistory extends GenericEditor {
    
    getEditorData() {
        return UsersUserHistory_EditorData();
    }
}
