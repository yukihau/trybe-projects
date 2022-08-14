import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitRegisterButton from '../../components/Buttons/SubmitRegisterButton';
import RegisterErrorMessage from '../../components/Text/RegisterErrorMessage';
import payloads from '../../helpers/payloads';
import fetchFromDb from '../../helpers/fetch';
import storage from '../../helpers/storage';
import validate from '../../helpers/validations';
import '../../css/register.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  errorHidden: true,
  errorMessage: '',
};

function Register() {
  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const useButton = async () => {
    const payload = payloads.createPost({
      name: state.name,
      email: state.email,
      password: state.password,
    });

    const response = await fetchFromDb(payload, 'register');

    if (!response.success) {
      return setState({
        ...state,
        errorHidden: false,
        errorMessage: response.json.error,
      });
    }

    storage.user.set(response.json);
    return navigate('/customer/products');
  };

  const setRegisteredField = (event, field) => {
    const { value } = event.target;
    return setState({ ...state, errorHidden: true, [field]: value });
  };

  const registerDataIsInvalid = () => {
    const nameIsValid = validate.name(state.name);
    const emailIsValid = validate.email(state.email);
    const passwordIsValid = validate.password(state.password);

    if (nameIsValid && emailIsValid && passwordIsValid) return false;

    return true;
  };

  return (
    <div className="Register">
      <div className="imgPerfil" />
      <form>
        <label htmlFor="name-input">
          <input
            data-testid="common_register__input-name"
            id="name-input"
            type="text"
            placeholder="Seu nome"
            value={ state.name }
            onChange={ (event) => setRegisteredField(event, 'name') }
          />
        </label>
        <label htmlFor="email-input">
          <input
            data-testid="common_register__input-email"
            id="email-input"
            type="email"
            placeholder="seu-email@site.com.br"
            value={ state.email }
            onChange={ (event) => setRegisteredField(event, 'email') }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="common_register__input-password"
            id="password-input"
            type="password"
            placeholder="******"
            value={ state.password }
            onChange={ (event) => setRegisteredField(event, 'password') }
          />
        </label>
        <SubmitRegisterButton
          disabled={ registerDataIsInvalid() }
          onClick={ useButton }
        />
        <RegisterErrorMessage
          hidden={ state.errorHidden }
          error={ state.errorMessage }
        />
      </form>
    </div>
  );
}

export default Register;
