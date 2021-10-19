import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';

class Form extends React.Component {
  validateCheckbox(props) {
    const { hasTrunfo, cardTrunfo, onInputChange } = props;

    if (hasTrunfo) {
      return (
        <p testid="trunfo-input">
          Você já tem um Super Trunfo em seu baralho.
        </p>
      );
    }

    return (
      <Input
        id="cardTrunfo"
        testid="trunfo-input"
        nameAfter="Super Trybe Trunfo"
        onInputChange={ onInputChange }
        type="checkbox"
        checked={ cardTrunfo }
      />
    );
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form>
        <div className="left main__forms">
          <h2>Adicionar nova carta</h2>

          <Input
            testid="name-input"
            id="cardName"
            name="Nome"
            onInputChange={ onInputChange }
            type="text"
            placeholder="Placeholder"
            value={ cardName }
          />

          <Textarea
            testid="description-input"
            id="cardDescription"
            name="Descrição"
            onInputChange={ onInputChange }
            value={ cardDescription }
          />

          <Input
            testid="attr1-input"
            id="cardAttr1"
            name="Attr1"
            onInputChange={ onInputChange }
            type="number"
            value={ cardAttr1 }
          />

          <Input
            testid="attr2-input"
            id="cardAttr2"
            name="Attr2"
            onInputChange={ onInputChange }
            type="number"
            value={ cardAttr2 }
          />

          <Input
            testid="attr3-input"
            id="cardAttr3"
            name="Attr3"
            onInputChange={ onInputChange }
            type="number"
            value={ cardAttr3 }
          />

          <Input
            testid="image-input"
            id="cardImage"
            name="Imagem"
            onInputChange={ onInputChange }
            type="text"
            value={ cardImage }
          />

          <Select
            id="cardRare"
            onInputChange={ onInputChange }
            value={ cardRare }
          />

          { this.validateCheckbox(this.props) }

          <button
            disabled={ isSaveButtonDisabled }
            className="btn-submit"
            data-testid="save-button"
            type="button"
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = PropTypes.shape({
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}).isRequired;

export default Form;
