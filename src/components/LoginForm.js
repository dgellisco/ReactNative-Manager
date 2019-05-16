// Import React and Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Import local actions
import { emailChanged, loginUser, passwordChanged } from '../actions';
// Import local components
import { Button, Card, CardSection, Input } from './common';


class LoginForm extends Component {

    // Helper function
    onEmailChange(text) {
        // Call an action creator to update application level state with new value user has typed in
        this.props.emailChanged(text);
    }

    // Helper function
    onPasswordChange(text) {
        // Call the action creator
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props.

        this.props.loginUser({ email, password });
    }

    render() {
        return (
            <Card>

                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@email.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextField
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password
    };
};

// export default connect(null, { emailChanged })LoginForm;
export default connect(mapStateToProps, {
    emailChanged, loginUser, passwordChanged
})(LoginForm);
