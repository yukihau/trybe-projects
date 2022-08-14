import React from 'react';
import { string } from 'prop-types';

function UserName(props) {
  const { name } = props;
  return (
    <div
      id="user-name"
      data-testid="customer_products__element-navbar-user-full-name"
    >
      { name }
    </div>
  );
}

UserName.propTypes = {
  name: string.isRequired,
};

export default UserName;
