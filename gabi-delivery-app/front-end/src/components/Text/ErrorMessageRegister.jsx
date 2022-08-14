import React from 'react';
import { bool, string } from 'prop-types';

function InvalidRegister(props) {
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

InvalidRegister.propTypes = {
  hidden: bool.isRequired,
  error: string.isRequired,
};

export default InvalidRegister;
