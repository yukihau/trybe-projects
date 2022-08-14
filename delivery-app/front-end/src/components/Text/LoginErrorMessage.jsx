import React from 'react';
import { bool, string } from 'prop-types';

function LoginErrorMessage(props) {
  const { hidden, error } = props;
  return (
    <div
      id="invalid-email"
      data-testid="common_login__element-invalid-email"
      hidden={ hidden }
    >
      { error }
    </div>
  );
}

LoginErrorMessage.propTypes = {
  hidden: bool.isRequired,
  error: string.isRequired,
};

export default LoginErrorMessage;
