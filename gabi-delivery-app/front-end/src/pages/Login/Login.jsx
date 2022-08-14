import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import EmailInput from '../../components/Inputs/EmailInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import LoginButton from '../../components/Buttons/LoginButton';
import RegisterRedirectButton from '../../components/Buttons/RegisterRedirectButton';
import ErrorMessage from '../../components/Text/ErrorMessage';
import { validateEmail, validatePassword } from '../../helpers/validations';
import { createPostPayload } from '../../helpers/payloads';
import { validateUserInDatabase } from '../../helpers/fetch';
import {
  setUserInLocalStorage,
  getUserFromLocalStorage,
} from '../../helpers/storage';

const INITIAL_STATE = {
  email: '',
  password: '',
  errorIsHidden: true,
  fetchErrorMessage: '',
  isLoggedIn: false,
};

function Login() {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const verifyLogin = async () => {
      const user = await getUserFromLocalStorage();
      if (user) {
        return setState((s) => ({ ...s, isLoggedIn: true }));
      }
    };

    verifyLogin();
  }, []);

  const setLoginField = async (event, field) => {
    const { value } = event.target;
    await setState({ ...state, errorIsHidden: true, [field]: value });
  };

  const loginDetailsAreValid = () => {
    const emailIsValid = validateEmail(state.email);
    const passwordIsValid = validatePassword(state.password);
    return !emailIsValid || !passwordIsValid;
  };

  const submitLogin = async () => {
    const payload = createPostPayload({ email: state.email, password: state.password });
    const response = await validateUserInDatabase(payload);
    if (!response.success) {
      return setState({
        ...state,
        errorIsHidden: false,
        fetchErrorMessage: response.json.error,
      });
    }
    setUserInLocalStorage(response.json);
    return setState({ ...state, isLoggedIn: true });
  };

  return (
    <div className="Login">
      { state.isLoggedIn && <Navigate to="/customer/products" /> }
      <h2>App de Delivery</h2>
      <form>
        <EmailInput
          onChange={ setLoginField }
          value={ state.email }
        />
        <PasswordInput
          onChange={ setLoginField }
          value={ state.password }
        />
        <LoginButton
          onClick={ submitLogin }
          disabled={ loginDetailsAreValid() }
        />
        <RegisterRedirectButton />
        <ErrorMessage
          hidden={ state.errorIsHidden }
          error={ state.fetchErrorMessage }
        />
      </form>
    </div>
  );
}

export default Login;
