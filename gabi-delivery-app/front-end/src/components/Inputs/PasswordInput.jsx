import React from 'react';
import { func, string } from 'prop-types';

function PasswordInput(props) {
  const { value, onChange } = props;
  return (
    <label htmlFor="password-input">
      <input
        id="password-input"
        data-testid="common_login__input-password"
        type="password"
        placeholder="Password"
        autoComplete="off"
        value={ value }
        onChange={ (event) => onChange(event, 'password') }
      />
    </label>
  );
}

PasswordInput.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
};

export default PasswordInput;
