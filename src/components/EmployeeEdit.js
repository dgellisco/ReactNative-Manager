import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Button, Card, CardSection, Confirm } from './common';
import { employeeDelete, employeeSave, employeeUpdate } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
    state = { showModal: false };

    componentWillMount() {
        // Use lodash to iterate over key-value pairs of the employee
        _.each(this.props.employee, (value, prop) => {
            // Updates the fields with the values derived from props
            this.props.employeeUpdate({ prop, value });
        })
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;

        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onAccept(){
        const { uid } = this.props.employee;

        this.props.employeeDelete({ uid });
    }

    onDecline(){
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Card>

                <EmployeeForm />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Fire Employee
                    </Button>
                </CardSection>

                {/* This is a modal and can be placed anywhere in this JSX
                It is not visible until we specifically toggle it to be visible */}
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure want to delete this?
                </Confirm>

            </Card>
        );
    }
}

const mapStateToProps = state => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
}

// Bind action creators to component
export default connect(mapStateToProps, { employeeDelete, employeeSave, employeeUpdate })(EmployeeEdit);