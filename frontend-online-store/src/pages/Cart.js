import React from 'react';
import * as cartStorage from '../services/cartStorage';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localStorageIsFilled: false,
    };

    this.renderCartFromStorage = this.renderCartFromStorage.bind(this);
    this.validateLocalStorage = this.validateLocalStorage.bind(this);
    this.increaseQuantityOf = this.increaseQuantityOf.bind(this);
    this.decreaseQuantityOf = this.decreaseQuantityOf.bind(this);
  }

  componentDidMount() { this.validateLocalStorage(); }

  validateLocalStorage() {
    const storedCart = localStorage.getItem('addProducts');
    this.setState({ localStorageIsFilled: false });
    if (storedCart) this.setState({ localStorageIsFilled: true });
  }

  increaseQuantityOf(product) {
    const { validateLocalStorage } = this;
    cartStorage.increaseQuantity(product);
    validateLocalStorage();
  }

  decreaseQuantityOf(product) {
    const { validateLocalStorage } = this;
    cartStorage.reduceQuantity(product);
    validateLocalStorage();
  }

  renderCartFromStorage() {
    const storedCart = JSON.parse(localStorage.getItem('addProducts'));
    const { increaseQuantityOf, decreaseQuantityOf } = this;

    return storedCart.map((item) => {
      const { id, title, thumbnail, price, quantity } = item;
      return (
        <section key={ id } data-testid="product">
          <h3 data-testid="shopping-cart-product-name">
            { title }
          </h3>
          <img src={ thumbnail } alt={ `Imagem: ${title}` } />
          <p>{ price }</p>
          <p
            data-testid="shopping-cart-product-quantity"
          >
            Quantidade:
            {' '}
            { quantity }
          </p>
          <div>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => increaseQuantityOf(item) }
            >
              +
            </button>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => decreaseQuantityOf(item) }
            >
              -
            </button>
          </div>
        </section>
      );
    });
  }

  render() {
    const { localStorageIsFilled } = this.state;
    const { renderCartFromStorage } = this;

    const emptyMessage = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>
    );

    return (
      <div>
        { localStorageIsFilled ? renderCartFromStorage() : emptyMessage }
      </div>
    );
  }
}

export default Cart;
