import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrenciesThunk,
  fetchCurrenciesForExpenses,
} from '../actions/fetchCurrencies';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.addFormToState = this.addFormToState.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  handleButton() {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState(INITIAL_STATE);
  }

  addFormToState({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderCurrencies() {
    const currenciesToRender = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const { addFormToState } = this;
    const { currency } = this.state;

    return (
      <label htmlFor="currency">
        Moeda:
        {' '}
        <select
          name="currency"
          value={ currency }
          onChange={ addFormToState }
          id="currency"
          className="select-input"
          data-testid="currency-input"
        >
          { currenciesToRender.map((currencyOption) => (
            <option
              key={ currencyOption }
              data-testid={ currencyOption }
              name={ currencyOption }
            >
              { currencyOption }
            </option>
          )) }
        </select>
      </label>
    );
  }

  renderMethod() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { addFormToState } = this;
    const { method } = this.state;

    return (
      <label htmlFor="method">
        Método de pagamento:
        {' '}
        <select
          name="method"
          value={ method }
          onChange={ addFormToState }
          id="method"
          className="select-input"
          data-testid="method-input"
        >
          { methods.map((methodString) => (
            <option key={ methodString }>{ methodString }</option>
          )) }
        </select>
      </label>
    );
  }

  renderTag() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { addFormToState } = this;
    const { tag } = this.state;

    return (
      <label htmlFor="tag">
        Categoria:
        {' '}
        <select
          name="tag"
          value={ tag }
          onChange={ addFormToState }
          id="tag"
          className="select-input"
          data-testid="tag-input"
        >
          { tags.map((tagString) => (
            <option key={ tagString }>{ tagString }</option>
          )) }
        </select>
      </label>
    );
  }

  render() {
    const {
      handleButton,
      addFormToState,
      renderCurrencies,
      renderMethod,
      renderTag,
    } = this;
    const { value, description } = this.state;

    return (
      <form>
        <label htmlFor="valor">
          Valor:
          {' '}
          <input
            type="text"
            name="value"
            value={ value }
            onChange={ addFormToState }
            id="valor"
            className="text-input"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          {' '}
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ addFormToState }
            id="descricao"
            className="text-input"
            data-testid="description-input"
          />
        </label>
        { renderCurrencies() }
        { renderMethod() }
        { renderTag() }
        <button type="button" className="add-btn" onClick={ handleButton }>
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.defaultProps = {
  wallet: {
    currencies: [],
  },
};

ExpenseForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  requestCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.instanceOf(Array),
  }),
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (state) => dispatch(fetchCurrenciesForExpenses(state)),
  requestCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
