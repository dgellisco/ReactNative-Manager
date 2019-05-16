import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Import firebase and firebase config
import firebase from 'firebase';
import firebaseConfig from '../firebase.config';
// Import redux thunk
import ReduxThunk from 'redux-thunk';
// Import local components
import LoginForm from './components/LoginForm';
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

        return (
            <Provider store={store} style={{ flex: 1 }}>
                <LoginForm />
            </Provider>
        );
    }

}

export default App;
