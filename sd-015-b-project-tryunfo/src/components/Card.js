import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div id={ cardTrunfo ? 'trunfo-card' : { cardName } } className="card">
        <h1 data-testid="name-card">{cardName}</h1>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card">{cardDescription}</p>
        <p data-testid="attr1-card">
          Attr1:
          {cardAttr1}
        </p>
        <p data-testid="attr2-card">
          Attr2:
          {cardAttr2}
        </p>
        <p data-testid="attr3-card">
          Attr3:
          {cardAttr3}
        </p>
        <h4 data-testid="rare-card">{cardRare}</h4>
        { cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo!</p> : '' }
      </div>
    );
  }
}

Card.propTypes = PropTypes.shape({
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}).isRequired;

export default Card;
