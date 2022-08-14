import React from 'react';
import { func } from 'prop-types';

function RegisterRedirectButton(props) {
  const { onClick } = props;
  return (
    <button
      type="button"
      id="register-btn"
      data-testid="common_login__button-register"
      onClick={ onClick }
    >
      Ainda não tenho conta
    </button>
  );
}

RegisterRedirectButton.propTypes = {
  onClick: func.isRequired,
};

export default RegisterRedirectButton;
