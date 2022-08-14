import React from 'react';
import { func, bool } from 'prop-types';

function SubmitRegisterButton(props) {
  const { disabled, onClick } = props;
  return (
    <div>
      <button
        type="button"
        id="register-btn"
        data-testid="common_register__button-register"
        onClick={ onClick }
        disabled={ disabled }
      >
        Cadastrar
      </button>
    </div>
  );
}

SubmitRegisterButton.propTypes = {
  onClick: func.isRequired,
  disabled: bool.isRequired,
};

export default SubmitRegisterButton;
