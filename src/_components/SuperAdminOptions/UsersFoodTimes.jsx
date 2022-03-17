import { GenericEditor } from '../../_services/generic.editor.service';
import { FoodMomentsSelect } from './FoodMoments';


export function UsersFoodTimes_EditorData() {
    return {
        baseUrl: 'food_times',
        title: 'Food Times',
        name: 'Food Time',
        component: UsersFoodTimes,
        dbApiUrl: 'users/user-food-times',

        type: 'child_listing',
        subType: 'array', // 'array' | 'table'
        array_name: 'food_times',
        parentKeyNames: [
            {
                parameterName: 'user_id',
                parentElementName: 'id'
            }
        ],
        primaryKeyName: 'food_moment_id',

        fieldElements: [
            {
                name: 'food_moment_id',
                label: 'Type',
                required: true,
                type: 'select_component',
                // select_elements: (<FoodMomentsSelect></FoodMomentsSelect>),
                component: FoodMomentsSelect,
                listing: true
            }, 
            {
                name: 'food_time',
                required: true,
                label: 'Time',
                type: 'text',
                readonly: false,
                listing: true
            }, 
        ]
    }
}


export class UsersFoodTimes extends GenericEditor {
    
    getEditorData() {
        return UsersFoodTimes_EditorData();
    }
}
