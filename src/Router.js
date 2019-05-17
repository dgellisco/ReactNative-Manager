import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeList from './components/EmployeeList';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
    return (
        <Router>
            {/* Root/parent scene.  Ever router must have one root scene */}
            <Scene key="root" hideNavBar>
                {/* The key is simply to identify what the scene is for.  We also use it to call that scene in actions.
                The component is the component to be displayed
                The title is the header generated for that page */}
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial/>
                </Scene>
                {/* When navigating to main, it will render the first child scene within it */}
                <Scene key="main">
                    <Scene
                        rightTitle="Add"
                        onRight={() => { Actions.employeeCreate() }}
                        key="employeeList"
                        component={EmployeeList}
                        title="Employees"
                        initial
                    />
                    <Scene
                        key="employeeCreate"
                        component={EmployeeCreate}
                        title="Create Employee"
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
