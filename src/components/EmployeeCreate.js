import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeCreate, employeeUpdate } from '../actions';
import { Button, Card, CardSection } from './common';
import EmployeeForm from './EmployeeForm';


// We choose to put our form data on redux/app-level state, rather than component-level state
class EmployeeCreate extends Component {
    onButtonPress() {
        const { name, phone, shift } = this.props;

        // For shift, default to shift value or use 'Monday' if shift is an empty string, which is a falsey value
        this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
    }

    render() {
        console.log(this.props.employee);

        return (
            <Card>
                {/* Take all the props from this component, and pass to the EmployeeForm component */}
                <EmployeeForm {...this.props} />
                <CardSection>
                    {/* Bind the context because this is a callback on this file */}
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

// Connect handler
// connect(???, { actionCreator, actionCreator })(thisComponent);
export default connect(mapStateToProps, {
    employeeCreate, employeeUpdate
})(EmployeeCreate);
