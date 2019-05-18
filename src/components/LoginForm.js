// Import React and Redux
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
// Import local actions
import { emailChanged, loginUser, passwordChanged } from '../actions';
// Import local components
import { Button, Card, CardSection, Input, LoadingSpinner } from './common';


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
        console.log("got pressed");

        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton() {
        if (this.props.loggingIn) {
            return <LoadingSpinner size='large' />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
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

                {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

// A Redux method.  Takes the state and allows us to selectively map it to props for this component.
    // #1 way to write it
// const mapStateToProps = state => {
//     return {
//         email: state.auth.email,
//         password: state.auth.password,
//         error: state.auth.error,
//         loggingIn: state.auth.loggingIn
//     };
// };
    // #2 way to write it
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loggingIn } = auth;

    return { email, password, error, loggingIn }
}

// export default connect(null, { emailChanged })LoginForm;
export default connect(mapStateToProps, {
    emailChanged, loginUser, passwordChanged
})(LoginForm);
