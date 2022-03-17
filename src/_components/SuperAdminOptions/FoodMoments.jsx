import React from 'react';
import { console_debug_log } from '../../_services';
import { GenericEditor } from '../../_services/generic.editor.service';
import { dbApiService } from '../../_services';


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


export class FoodMomentsSelect extends React.Component {

    editor = null;
    dbService = null;

    constructor(props) {
        super(props);
        this.editor = this.getEditorData();
        this.state = this.initialState();
        this.dbService = new dbApiService({url: this.editor.dbApiUrl})
    }

    getEditorData() {
        return FoodMoments_EditorData();
    }

    initialState() {
        return {
            db_rows: null,
            filter: (typeof this.props.filter !== 'undefined' ? this.props.filter : null),
            show_description: (typeof this.props.show_description !== 'undefined' ? this.props.show_description : false),
        };
    }

    componentDidMount() {
        this.dbService.getAll()
            .then( (listingDataset) => {
                // console_debug_log('FoodMomentsSelect | fieldName: ' + this.props.fieldName + ' | listingDataset object:');
                // console_debug_log(listingDataset);
                this.setState({db_rows: listingDataset});
                // this.editor.db_rows = listingDataset;
            })
            .catch( (error) => {
                console_debug_log('FoodMomentsSelect | error object:');
                console_debug_log(error);
            });
    }

    render() {
        if (this.state.db_rows === null) {
            // Still not ready...
            return ('');
        }
        const selectOptions = this.state.db_rows.resultset;
        let dbService = this.dbService;
        const {filter, show_description} = this.state;
        // const selectOptions = this.editor.db_rows;
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
                            key={dbService.convertId(option._id)+'_key'}
                            value={dbService.convertId(option._id)}
                        >{option.name}
                        </option>
                    );
                })
        );
    }
}
