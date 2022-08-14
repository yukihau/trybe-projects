import React from 'react';
import { func, bool } from 'prop-types';

function LoginButton(props) {
  const { disabled, onClick } = props;
  return (
    <div>
      <button
        type="button"
        id="login-btn"
        data-testid="common_login__button-login"
        disabled={ disabled }
        onClick={ onClick }
      >
        Login
      </button>
    </div>
  );
}

LoginButton.propTypes = {
  disabled: bool.isRequired,
  onClick: func.isRequired,
};

export default LoginButton;
