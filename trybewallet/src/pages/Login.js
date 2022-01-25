import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userAction from '../actions/userActions';

// Essa função cria um array que separa o email em partes para melhor validação
const createEmailArray = (email) => {
  const array = [];
  array.push(email.substr(0, email.indexOf('@')));
  array.push(email.substr(email.indexOf('@'), email.indexOf('.')));
  array.push(email.substr(email.indexOf('.')));
  array.push(email.split('')
    .filter((char) => char === '@' || char === '.')
    .join(''));
  return array;
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailIsValidated: false,
      passwordIsValidated: false,
      isDisabled: true,
      redirect: false,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  validateEmail({ target }) {
    const email = target.value;
    const emailArr = createEmailArray(email);
    const amountOfFields = 4;
    let validatedFields = 0;
    let emailIsValidated = false;

    emailArr.forEach((element) => {
      let minFieldLength = 2;

      if (element === '@.') { validatedFields += 1; return 'done'; }
      if (element === emailArr[0] && element.length >= 1) minFieldLength = 1;
      if (element.length >= minFieldLength) { validatedFields += 1; return 'done'; }
    });

    if (validatedFields === amountOfFields) emailIsValidated = true;

    this.setState({ email, emailIsValidated }, () => this.validateButton());
  }

  validatePassword({ target }) {
    const password = target.value;
    const minLength = 6;
    let passwordIsValidated = false;
    if (password.length >= minLength) passwordIsValidated = true;
    this.setState({ password, passwordIsValidated }, () => this.validateButton());
  }

  validateButton() {
    const { emailIsValidated, passwordIsValidated } = this.state;
    let isDisabled = true;
    if (emailIsValidated && passwordIsValidated) {
      isDisabled = false;
    }
    this.setState({ isDisabled });
  }

  handleLogin() {
    const { email, password, isDisabled } = this.state;
    const { send } = this.props;
    if (isDisabled === false) this.setState({ redirect: true });
    send({ email, password, isLoggedIn: true });
  }

  render() {
    const { email, password, isDisabled, redirect } = this.state;
    const { validateEmail, validatePassword, handleLogin } = this;

    return (
      <div>
        <h1>TrybeWallet™</h1>
        <input
          type="email"
          placeholder="E-mail"
          value={ email }
          onChange={ validateEmail }
          data-testid="email-input"
        />
        <input
          type="text"
          placeholder="Senha"
          value={ password }
          onChange={ validatePassword }
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ handleLogin }
        >
          Entrar
        </button>
        { redirect && <Redirect to="/carteira" /> }
      </div>
    );
  }
}

Login.propTypes = {
  send: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  send: (state) => dispatch(userAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
