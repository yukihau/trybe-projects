import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../../components/Inputs/EmailInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import LoginButton from '../../components/Buttons/LoginButton';
import RegisterRedirectButton from '../../components/Buttons/RegisterRedirectButton';
import LoginErrorMessage from '../../components/Text/LoginErrorMessage';
import validate from '../../helpers/validations';
import payloads from '../../helpers/payloads';
import fetchFromDb from '../../helpers/fetch';
import storage from '../../helpers/storage';
import '../../css/login.css';

const INITIAL_STATE = {
  email: '',
  password: '',
  errorHidden: true,
  errorMessage: '',
};

function Login() {
  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const verifyUserRoleToNavigate = async () => {
    const isSeller = await storage.user.is.seller();
    if (isSeller) return navigate('/seller/orders');
    return navigate('/customer/products');
  };

  const setLoginField = async (event, field) => {
    const { value } = event.target;
    await setState({ ...state, errorHidden: true, [field]: value });
  };

  const loginDetailsAreInvalid = () => {
    const emailIsValid = validate.email(state.email);
    const passwordIsValid = validate.password(state.password);
    if (emailIsValid && passwordIsValid) return false;
    return true;
  };

  const submitLogin = async () => {
    const payload = payloads.createPost({ email: state.email, password: state.password });
    const response = await fetchFromDb(payload, 'login');

    if (!response.success) {
      return setState({
        ...state,
        errorHidden: false,
        errorMessage: response.json.error,
      });
    }

    await storage.user.set(response.json);

    verifyUserRoleToNavigate();
  };

  const redirectToRegister = () => navigate('/register');

  const verifyLogin = async () => {
    const user = await storage.user.get();
    if (user) verifyUserRoleToNavigate();
  };

  useEffect(() => {
    verifyLogin();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Login">
      <div className="imgLogo" />
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
          disabled={ loginDetailsAreInvalid() }
        />
        <RegisterRedirectButton
          onClick={ redirectToRegister }
        />
        <LoginErrorMessage
          hidden={ state.errorHidden }
          error={ state.errorMessage }
        />
      </form>
    </div>
  );
}

export default Login;
