import React from 'react';
import { func } from 'prop-types';

function SubmitRegisterButton(props) {
  const { onClick } = props;
  return (
    <div>
      <button
        type="button"
        id="register-btn"
        data-testid="common_register__button-register"
        onClick={ onClick }
      >
        Cadastrar
      </button>
    </div>
  );
}

SubmitRegisterButton.propTypes = {
  onClick: func.isRequired,
};

export default SubmitRegisterButton;
