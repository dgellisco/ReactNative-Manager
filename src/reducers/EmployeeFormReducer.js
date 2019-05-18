import {
    EMPLOYEE_CREATE,
    EMPLOYEE_UPDATE,
    EMPLOYEE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_UPDATE:
            // action.payload === { prop: 'name', value: 'Stephen' };
            // Square braces are not an array - it is key interpolation.
            // It will take the value of the prop and make that the key name
            // Saves us having to create a new key for name, password, etc.
            return { ...state, [action.payload.prop]: action.payload.value }
        
        case EMPLOYEE_CREATE:
            return INITIAL_STATE;
        
        case EMPLOYEE_SAVE_SUCCESS:
            return INITIAL_STATE;
        
        default:
            return state;
    }
}