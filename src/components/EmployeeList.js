import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {

    // Lifecycle method
    componentWillMount() {
        // aSync request
        this.props.employeesFetch();

        // Create data source with new props
        this.createDataSource(this.props);
    }

    // Lifecycle method, called any time a new set of props is to be received
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered wtih.
        // this.props is still the old set of props

        // Create data source with next props
        this.createDataSource(nextProps);
    }

    // Helper method
    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(employees);
    }

    // Helper method
    // Called with a single employee
    renderRow(employee) {
        return <EmployeeListItem employee={employee} />;
    }

    render() {
        console.log(this.props);
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    // state.employees is an object with many key value pairs
    // For each val and uid, the fat arrow function will run
    // Push all to new objec, and also add the uid
    const employees = _.map(state.employees, (val, uid) => {
        // Return an object containing all the properties of the employee model, AND the userID
        return { ...val, uid }; // { shift: 'Monday', name: 'Sam', phone: '123456', id: '1231ascfj3k1r'}
    });

    return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);