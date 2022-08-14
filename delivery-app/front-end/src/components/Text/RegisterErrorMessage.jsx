import React from 'react';
import { bool, string } from 'prop-types';

function RegisterErrorMessage(props) {
  const { hidden, error } = props;
  return (
    <div
      id="invalid-register"
      data-testid="common_register__element-invalid_register"
      hidden={ hidden }
    >
      { error }
    </div>
  );
}

RegisterErrorMessage.propTypes = {
  hidden: bool.isRequired,
  error: string.isRequired,
};

export default RegisterErrorMessage;
