// General
import React, { useEffect, useState, useContext } from 'react';
import { string, number } from 'prop-types';
import storage from '../../../helpers/storage';
import AppContext from '../../../context/AppContext';

// Card Components
import TitleText from './TitleText';
import PriceText from './PriceText';
import Image from './Image';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import Quantity from './Quantity';

function ProductCard(props) {
  const { id, name, price, urlImage } = props;
  const [quantity, setQuantity] = useState(0);
  const { getCart } = useContext(AppContext);

  const addOne = () => setQuantity(quantity + 1);

  const removeOne = () => {
    if (quantity <= 1) return setQuantity(0);
    return setQuantity(quantity - 1);
  };

  const submitQuantity = (event) => {
    const { value } = event.target;

    if (value <= 0 && quantity <= 0) return setQuantity(0);
    if (value === '') return setQuantity(0);
    if (Number.isNaN(parseInt(value, 10))) return false;

    return setQuantity(parseInt(value, 10));
  };

  useEffect(() => {
    const productInCart = storage.cart.product.find(id);
    if (productInCart) setQuantity(productInCart.quantity);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (quantity <= 0) {
      storage.cart.product.remove(id);
    }

    if (quantity > 0) {
      const product = { id, name, price, urlImage, quantity };
      storage.cart.product.set(product);
    }

    getCart();
    // eslint-disable-next-line
  }, [quantity]);

  return (
    <div
      className="product-card"
    >
      <div className="product-card-header">
        <PriceText
          key={ `price-text-${id}` }
          price={ price }
          id={ id }
        />
        <Image
          key={ `image-${id}` }
          urlImage={ urlImage }
          id={ id }
        />
      </div>
      <div className="product-card-body">
        <TitleText
          key={ `title-text-${id}` }
          name={ name }
          id={ id }
        />
        <div className="product-card-buttons">
          <RemoveButton
            key={ `remove-button-${id}` }
            onClick={ removeOne }
            id={ id }
          />
          <Quantity
            key={ `quantity-${id}` }
            quantity={ quantity }
            onChange={ submitQuantity }
            id={ id }
          />
          <AddButton
            key={ `add-button-${id}` }
            onClick={ addOne }
            id={ id }
          />
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  price: string.isRequired,
  urlImage: string.isRequired,
};

export default ProductCard;
