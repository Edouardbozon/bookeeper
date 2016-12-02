import React from 'react';
import { render } from 'react-dom'
import Bookkeeper from './components/app.component';
import SignInForm from './components/sign-in-form.component';
import Dashboard from './components/dashboard.component';
import firebaseConfig from './constants/firebase.config.js';
import { Router, Route, Link, browserHistory } from 'react-router';



render((
    <Router history={browserHistory}>
        <Route path="/" component={Bookkeeper}>
            <Route path="sign-in" component={SignInForm}/>
            <Route path="dashboard" component={Dashboard}/>
        </Route>
    </Router>
), document.getElementById('bookkeeper'));
