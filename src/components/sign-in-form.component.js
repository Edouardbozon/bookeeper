import React, { Component } from 'react';
import firebase from 'firebase';

export default class SignInForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        };
    }

    handleChange(name, event) {
        const formData = {
            [name]: event.target.value
        };
        this.setState(formData);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div>
                { this.state.error ?
                    <div>
                        { this.state.error }
                    </div> :
                    null }
                <form name="signInForm" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Email</label>
                        <input
                            value={this.state.email}
                            onChange={this.handleChange.bind(this, 'email')}
                            name="email"
                            type="email"
                            required/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            value={this.state.password}
                            onChange={this.handleChange.bind(this, 'password')}
                            name="password"
                            type="password"
                            required/>
                    </div>
                    <button type="submit">
                         Sign in
                    </button>
                </form>
            </div>
        );
    }

};
