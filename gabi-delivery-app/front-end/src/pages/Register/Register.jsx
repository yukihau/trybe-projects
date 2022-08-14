import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../helpers/validations';
import SubmitRegisterButton from '../../components/Buttons/SubmitRegisterButton';
import ErrorMessageRegister from '../../components/Text/ErrorMessageRegister';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  errorIsHidden: true,
  fetchErrorMessageRegister: '',
  isLoggedIn: false,
};

function Register() {
  const [state, setState] = useState(INITIAL_STATE);

  const useButton = () => {
    const validate = createValidation({
      validateName,
      validateEmail,
      validatePassword});
    if (!validate) 
    return isLoggedIn(true);
  };
// faz o fetch pra /register, verifica se o retorno é um sucesso e se for, muda isLoggedIn para true

  const setRegisteredField = async (event, field) => {
    const { value } = event.target;
    await setState({ ...state, errorIsHidden: true, [field]: value });
  };


  return (
    <div>
      { state.isLoggedIn && <Navigate to="/customer/products" /> }
      <h2>Cadastro</h2>
      <form>
        <label htmlFor="name-input">
          Nome
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
          Email
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
          Senha
          <input
            data-testid="common_register__input-password"
            id="password-input"
            type="password"
            placeholder="******"
            value={ state.password }
            onChange={ (event) => setRegisteredField(event, 'password') }
          />
        </label>
        <SubmitRegisterButton onClick={ useButton } />
        <ErrorMessageRegister
          hidden={ state.errorIsHidden }
          error={ state.fetchErrorMessage }
        />
      </form>
    </div>
  );
}

export default Register;
