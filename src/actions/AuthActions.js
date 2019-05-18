// ACTION CREATOR FILE

// Import firebase and router-flux actions
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';
// Import action type variables
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGGING_IN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from './types';

// Action creator
export const emailChanged = (text) => {
    // Returned action
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    // Redux-Thunk allows us to return a function from an action creator
    // This allows us to return an object by using an async function and the 'dispatch' method
    // Dispatch allows us to dispatch multiple actions from one action creator
    return (dispatch) => {
        dispatch({ type: LOGGING_IN });

        // Promise
        firebase.auth().signInWithEmailAndPassword(email, password)
            // Then clause
            .then(user => loginUserSuccess(dispatch, user))
            // If the above fails, run the catch case
            .catch((error) => {
                console.log(error);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFail(dispatch))
            });
    };
};

// Helper function
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
};

// Helper function
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    // Use router-flux to load the employeeList scene
    Actions.main();
    Actions.employeeList();

};