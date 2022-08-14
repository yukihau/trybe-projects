import React from 'react';
import { func } from 'prop-types';

function LogoutButton(props) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="logout-btn"
      data-testid="customer_products__element-navbar-link-logout"
      onClick={ onClick }
    >
      Sair
    </button>
  );
}

LogoutButton.propTypes = {
  onClick: func.isRequired,
};

export default LogoutButton;
