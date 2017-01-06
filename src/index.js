import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';
import { render } from 'react-dom'

import configureStore from './store/store.configure.js';
import Bookkeeper from './components/app.component';
import SignInForm from './components/login/login.component';
import Dashboard from './components/dashboard/dashboard.component';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const tapEvent = injectTapEventPlugin(); // provides onTouchTap() to all React Components

render((
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={history}>
                <Route path="/" component={Bookkeeper}>
                    <IndexRedirect to="/login"/>
                    <Route path="login" component={SignInForm}/>
                    <Route path="dashboard" component={Dashboard}/>
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
), document.getElementById('bookkeeper'));
