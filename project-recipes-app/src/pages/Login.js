import React, { useState } from 'react';
import { useHistory } from 'react-router';
import '../assets/css/login.css';
import logo from '../images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function disableButton() {
    const MAX_LENGTH = 6;
    if (email.includes('@') && email.includes('.com')
    && password.length > MAX_LENGTH) {
      return false;
    }
    return true;
  }

  function submitButton() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const user = {
      email,
    };

    localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
  }

  return (
    <div className="login-container">
      <form>
        <img src={ logo } alt="Receitas Houseiras logo" />
        <div>
          <input
            placeholder="Email"
            value={ email }
            type="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <input
            placeholder="Senha"
            value={ password }
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ disableButton() }
            onClick={ submitButton }
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
