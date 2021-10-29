import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import EvaluationForm from '../components/EvaluationForm';
import setToLocalStorage from '../services/cartStorage';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
      freeShipping: false,
      loading: true,
    };

    this.getProduct = this.getProduct.bind(this);
    this.detailedRender = this.detailedRender.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  async getProduct() {
    const { match: { params: { category, id } } } = this.props;
    const { results } = await api.getProductsFromCategoryAndQuery(category, '');
    const product = results.find((item) => item.id === id);

    this.setState({
      product,
      freeShipping: product.shipping.free_shipping,
      loading: false,
    });
  }

  detailedRender() {
    const { product, freeShipping } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/Cart">
          Carrinho de Compras
        </Link>
        <h1 data-testid="product-detail-name">
          { product.title }
          { freeShipping && <p data-testid="free-shipping">Frete Grátis!</p> }
        </h1>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => setToLocalStorage(product) }
        >
          Adicionar ao Carrinho
        </button>
        <EvaluationForm id={ product.id } />
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    const { detailedRender } = this;
    const loadingText = (
      <p>Carregando...</p>
    );
    return (
      <div>
        { loading ? loadingText : detailedRender() }
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
