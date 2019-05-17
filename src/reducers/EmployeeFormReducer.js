import {
    EMPLOYEE_UPDATE
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

        default:
            return state;
    }
}