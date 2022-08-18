// import { console_debug_log } from '../../_services';
import { GenericEditor, GenericSelectGenerator, GenericSelectDataPopulator } from '../../_services/generic.editor.service';


export function FoodMoments_EditorData() {
    return {
        baseUrl: 'food_moments',
        title: 'Food Moments',
        name: 'Food Moment',
        component: FoodMoments,
        dbApiUrl: 'food_moments',
        fieldElements: [
            {
                name: 'id',
                required: true,
                label: 'ID',
                type: '_id',
                readonly: true
            }, 
            {
                name: 'name',
                required: true,
                label: 'Name',
                type: 'text',
                readonly: false,
                listing: true
            }, 
        ]
    }
}


export class FoodMoments extends GenericEditor {
    
    getEditorData() {
        return FoodMoments_EditorData();
    }
}


export class FoodMomentsSelect extends GenericSelectGenerator {

    getEditorData() {
        return FoodMoments_EditorData();
    }
}

export class FoodMomentDataPopulator extends GenericSelectDataPopulator {

    getEditorData() {
        return FoodMoments_EditorData();
    }
}
