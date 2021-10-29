import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtonDisabled: true,
      loggedIn: false,
      redirect: false,
    };
    this.validateName = this.validateName.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { name } = this.state;
    this.setState({ loggedIn: true });
    createUser({ name })
      .then(() => this.setState({ redirect: true }));
  }

  validateName({ target }) {
    const { value } = target;
    const minLength = 3;
    if (value.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    this.setState({ name: value });
  }

  render() {
    const { handleLogin, validateName } = this;
    const { name, isButtonDisabled, loggedIn, redirect } = this.state;
    const form = (
      <form>
        <input
          onChange={ validateName }
          type="text"
          placeholder="Nome"
          value={ name }
          data-testid="login-name-input"
        />

        <button
          onClick={ handleLogin }
          disabled={ isButtonDisabled }
          type="button"
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div data-testid="page-login">
        { loggedIn ? <Loading /> : form }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
