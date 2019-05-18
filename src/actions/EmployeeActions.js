// ACTION CREATOR FILE

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_CREATE,
    EMPLOYEE_UPDATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
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

// Fetch employee list
// The .on value call only needs to be called once - it will then watch for new data and automatically dispatch anytime there is a change
export const employeesFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            // Anytime we get any data i.e. 'value', return an object that describes what data is in our employee list
            // Snapshot is not a list of the employees, but rather a handle to allow us to access the employee list
            .on('value', snapshot => {
                // snapshot.val() gives the actual employee back
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    // aSync, use thunk dispatch method
    return (dispatch) => {
        // Locate database record with id of employee entry
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset' });
            });
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    // aSync.  We don't need to use change, because the firebase on value will automatically update our employeeList
    return() => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                Actions.employeeList({ type: 'reset' });
            });
    };
};
