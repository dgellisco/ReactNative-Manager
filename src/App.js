import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Import firebase and firebase config
import firebase from 'firebase';
import firebaseConfig from '../firebase.config';
// Import redux thunk
import ReduxThunk from 'redux-thunk';
// Import local router
import Router from './Router';
// Import local reducers
import reducers from './reducers';

class App extends Component {

    // Lifecycle method
    componentWillMount() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    // Render method
    render() {
        // {} is for any initial state we might want to pass the App.  Not too common, mostly used in server-side rendering.
        // applyMiddleware is considered a 'store enhancer'
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

        // Ignore firebase warning of timeout
        YellowBox.ignoreWarnings(['Setting a timer']);
        const _console = _.clone(console);
        console.warn = message => {
            if (message.indexOf('Setting a timer') <= -1) {
                _console.warn(message);
            }
        };

        return (
            <Provider store={store} style={{ flex: 1 }}>
                <Router />
            </Provider>
        );
    }

}

export default App;
