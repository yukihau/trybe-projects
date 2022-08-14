import React from 'react';
import { string } from 'prop-types';

function UserName(props) {
  const { name } = props;
  return (
    <div className="user-name">
      <span data-testid="customer_products__element-navbar-user-full-name">
        { name }
      </span>
    </div>
  );
}

UserName.propTypes = {
  name: string.isRequired,
};

export default UserName;
