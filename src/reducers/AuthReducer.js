// Responsible for state related to Authentication

// Imports
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from '../actions/types';

// Must have an initial or default state - cannot return undefined
// Doesn't need to include password, just has to have something (even if it's never used by the actual app)
// But this is useful for showing other developers what data exists here
const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {

        case EMAIL_CHANGED:
            // Outer curly braces creates a new object.
            // The ... takes all the properties (key/values) from state and throws them into a new object
            // It also adds on the action.payload, using a key of 'email'.  If the key of 'email' already exists, it will be over-written.
            // Because this is a new object in memory, it will cause Redux to re-render
            // Objects returned from a reducer must be a new object, so always use the destructing i.e. ...
            return { ...state, email: action.payload };
        
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload }
        
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed' }

        default:
            return state;
    }
};
