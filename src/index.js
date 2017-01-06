import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react';


import configureStore from './store/store.configure.js';
import Bookkeeper from './components/app.component';
import SignInForm from './components/sign-in-form.component';
import Dashboard from './components/dashboard.component';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Bookkeeper}>
                <IndexRedirect to="/login"/>
                <Route path="login" component={SignInForm}/>
                <Route path="dashboard" component={Dashboard}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('bookkeeper'));
