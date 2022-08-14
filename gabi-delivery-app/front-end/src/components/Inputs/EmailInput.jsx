import React from 'react';
import { func, string } from 'prop-types';

function EmailInput(props) {
  const { value, onChange } = props;
  return (
    <label htmlFor="email-input">
      <input
        id="email-input"
        data-testid="common_login__input-email"
        type="email"
        placeholder="Email"
        autoComplete="on"
        value={ value }
        onChange={ (event) => onChange(event, 'email') }
      />
    </label>
  );
}

EmailInput.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
};

export default EmailInput;
