import React from 'react';
import { number, bool, func } from 'prop-types';

function CartButton(props) {
  const { total, disabled, onClick } = props;
  const stringTotal = total.toFixed(2).toString().replace('.', ',');

  return (
    <button
      type="button"
      className="cart-btn"
      data-testid="customer_products__button-cart"
      disabled={ disabled }
      onClick={ onClick }
    >
      Ver Carrinho:
      { ' ' }
      R$:
      { ' ' }
      <span data-testid="customer_products__checkout-bottom-value">
        { stringTotal }
      </span>
    </button>
  );
}

CartButton.propTypes = {
  total: number.isRequired,
  disabled: bool.isRequired,
  onClick: func.isRequired,
};

export default CartButton;
