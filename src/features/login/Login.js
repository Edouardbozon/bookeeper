import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, WingBlank, WhiteSpace, Button, InputItem, Flex } from 'antd-mobile';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import MdLock from 'react-icons/lib/md/lock';
import MdEmail from 'react-icons/lib/md/email';
import MdFavorite from 'react-icons/lib/md/favorite';
import { createForm } from 'rc-form';
import * as actions from './redux/actions';

export class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getBaseline() {
    return (
      <span className="baseline">Handcrafted with <MdFavorite /></span>
    );
  }

  handleSubmit() {
    this.props.form.validateFields();
    const isLogin = this.props.login.showLoginForm;

    let props;
    let formData;
    if (isLogin) {
      props = ['email', 'password'];
      formData = this.props.form.getFieldsValue(props);

      this.props.actions.login(formData)
        .then((resp) => { console.log(resp); })
        .catch((err) => { console.log(err); });
    } else {
      props = ['r-email', 'r-password', 'name', 'age', 'repeat-password'];
      formData = this.props.form.getFieldsValue(props);

      formData.email = formData['r-email'];
      formData.password = formData['r-password'];
      delete formData['r-email'];
      delete formData['r-password'];

      this.props.actions.signup(formData)
        .then((resp) => { console.log(resp); })
        .catch((err) => { console.log(err); });
    }
  }

  renderLoginForm() {
    const { getFieldProps } = this.props.form;
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <InputItem
          {...getFieldProps('email')}
          required
          placeholder="email"
          type="email"
        >
          <MdAccountCircle />
        </InputItem>
        <InputItem
          {...getFieldProps('password')}
          required
          type="password"
          placeholder="password"
        >
          <MdLock />
        </InputItem>
        <WhiteSpace size="lg" />
        <Button className="btn" type="primary" onClick={() => this.handleSubmit()}>Login</Button>
        <WhiteSpace size="sm" />
        <Button className="btn" onClick={this.props.actions.toggleSignup}>or sign-up</Button>
      </form>
    );
  }

  renderSignupForm() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <InputItem
          {...getFieldProps('name')}
          type="text"
          required
          placeholder="name or pseudonym"
        />
        <InputItem
          {...getFieldProps('age')}
          type="number"
          required
          placeholder="Age"
        />
        <InputItem
          {...getFieldProps('r-email')}
          placeholder="email"
          required
          type="email"
        />
        <InputItem
          {...getFieldProps('r-password')}
          type="password"
          required
          placeholder="password"
        />
        <InputItem
          {...getFieldProps('repeat-password')}
          type="password"
          required
          placeholder="repeat the password"
        />
        <WhiteSpace size="lg" />
        <Button className="btn" type="primary" onClick={() => this.handleSubmit()}>Register me</Button>
        <WhiteSpace size="sm" />
        <Button className="btn" onClick={this.props.actions.toggleSignup}>or login</Button>
      </div>
    );
  }

  render() {
    return (
      <WingBlank>
        <Card className="welcome" />
        <Card className="login-form">
          <Card.Body>
            {this.props.login.showLoginForm ? this.renderLoginForm() : this.renderSignupForm()}
          </Card.Body>
          <WhiteSpace size="lg" />
          <Card.Footer extra={LoginForm.getBaseline()} />
        </Card>
      </WingBlank>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

const LoginFormWrapper = createForm()(LoginForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormWrapper);
