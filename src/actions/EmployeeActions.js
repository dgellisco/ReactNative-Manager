// ACTION CREATOR FILE

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_CREATE,
    EMPLOYEE_UPDATE
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

// Push new employee to user database
export const employeeCreate = ({ name, phone, shift }) => {

    const { currentUser } = firebase.auth();

    // Thunk workaround to renavigate back to employeeList
    return (dispatch) => {
        // Path to the JSON data store
        // ES6 template literal.  Backticks and ${} to access JavaScript variable
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({ name, phone, shift })
            // Go to employeeList component.  Pass in type reset to prevent a back button being generated.  Reset the view stack.
            .then(() => {
                // Dispatch the employee create action
                dispatch({ type: EMPLOYEE_CREATE })
                // Navigate back to employee list
                Actions.employeeList({ type: 'reset' })
            });
    }

};