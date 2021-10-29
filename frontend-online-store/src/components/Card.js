import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import setToLocalStorage from '../services/cartStorage';

class Card extends React.Component {
  render() {
    const { product } = this.props;
    const freeShipping = product.shipping.free_shipping;
    const freeShippingText = (
      <p data-testid="free-shipping">Frete Grátis!</p>
    );

    return (
      <section data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `ProductDetails/${product.category_id}/${product.id}` }
        >
          <div className="card">
            <h3>{ product.title }</h3>
            { freeShipping && freeShippingText }
            <img src={ product.thumbnail } alt={ `Imagem: ${product.title}` } />
            <p>{ `${product.price} R$` }</p>
          </div>
        </Link>
        <button
          data-testid="product-add-to-cart"
          id={ `btn-${product.id}` }
          type="button"
          onClick={ () => setToLocalStorage(product) }
        >
          Adicionar ao Carrinho
        </button>
      </section>
    );
  }
}

Card.defaultProp = { freeShipping: false };

Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    category_id: PropTypes.string.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
};

export default Card;
