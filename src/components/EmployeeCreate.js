import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { Button, Card, CardSection, Input } from './common'


// We choose to put our form data on redux/app-level state, rather than component-level state
class EmployeeCreate extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        // onChangeText={text => this.props.employeeUpdate({ prop: 'name', value: text })}
                        // ES6 refactor
                        onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-555"
                        value={this.props.phone}
                        onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
                    />
                </CardSection>
                
                {/* Local component that doesn't necessarily have a prop of style.  Must ensure one exists. */}
                <CardSection style={{ alignItems: 'center', flexDirection: 'column' }}>
                    {/* React-Native component with a prop of style by default */}
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <Picker
                        selectedValue={this.props.shift}
                        onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                </CardSection>

                <CardSection>
                    <Button>
                        Create
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

// connect(???, { actionCreator, actionCreator })(thisComponent);
export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);
