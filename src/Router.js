import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { ImageBackground } from 'react-native';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
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
                    <ImageBackground
                        source={{ uri:  }}
                        style={{ width: '100%', height: '100%' }}
                    >
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
                        <Scene
                            key="employeeEdit"
                            component={EmployeeEdit}
                            title="Edit Employee"
                        />
                    </ImageBackground>
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
