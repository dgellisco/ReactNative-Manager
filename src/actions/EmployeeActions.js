// ACTION CREATOR FILE

import firebase from 'firebase';
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

export const employeeCreate = ({ name, phone, shift }) => {
    // Path to the JSON data store
    firebase.database().ref('/users/userId/employees')
    // return {
    //     type: EMPLOYEE_CREATE,
    //     payload: { name, phone, shift }
    // };
};