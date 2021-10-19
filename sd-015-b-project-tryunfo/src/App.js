import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const INITIAL_STATE = {
  cards: [],
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  onInputChange({ target }) {
    const { id } = target;
    let { value } = target;
    if (id === 'cardTrunfo') value = target.checked;
    this.setState({ [id]: value }, () => this.validateData());
  }

  onSaveButtonClick() {
    const thisCard = { ...this.state };
    const { cards, cardTrunfo } = this.state;
    delete thisCard.cards;
    this.setState({ cards: [...cards, thisCard] });
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
    if (cardTrunfo === true) this.setState({ hasTrunfo: true });
  }

  validateData() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;
    const maxTotalAttr = 210;
    const maxAttr = 90;

    if (cardName.length > 0
        && cardDescription.length > 0
        && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= maxTotalAttr
        && Number(cardAttr1) <= maxAttr && Number(cardAttr1) >= 0
        && Number(cardAttr2) <= maxAttr && Number(cardAttr2) >= 0
        && Number(cardAttr3) <= maxAttr && Number(cardAttr3) >= 0
        && cardImage.length > 0) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  removeCard({ target }) {
    const { id } = target.previousSibling;
    const { cards } = this.state;
    const newCards = cards.filter((card) => card.cardName !== target.id);
    // Crédito pela solução: https://stackoverflow.com/questions/3396088/how-do-i-remove-an-object-from-an-array-with-javascript
    if (id === 'trunfo-card') this.setState({ hasTrunfo: false });
    this.setState({ cards: [...newCards] });
  }

  render() {
    const { onInputChange, onSaveButtonClick } = this;
    const { cards } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <section className="card__creator">
          <Form
            { ...this.state }
            onInputChange={ onInputChange }
            onSaveButtonClick={ onSaveButtonClick }
          />
          <div className="right card__preview">
            <h2>Pré-visualização</h2>
            <Card { ...this.state } />
          </div>
        </section>
        <section className="cards">
          {cards.map((card) => (
            <div key={ card.cardName }>
              <Card { ...card } />
              <button
                id={ card.cardName }
                type="button"
                data-testid="delete-button"
                onClick={ this.removeCard }
              >
                Remover
              </button>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
