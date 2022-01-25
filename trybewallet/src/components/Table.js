import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { refreshExpenses } from '../actions/walletActions';

class Table extends React.Component {
  constructor() {
    super();
    this.getCurrencyValue = this.getCurrencyValue.bind(this);
    this.getCurrencyValue = this.getCurrencyValue.bind(this);
    this.renderExpenses = this.renderExpenses.bind(this);
    this.convertValue = this.convertValue.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
  }

  getCurrencyName({ exchangeRates, currency }) {
    return exchangeRates[currency].name;
  }

  getCurrencyValue({ exchangeRates, currency }) {
    const { transformToValidNumber } = this;
    return transformToValidNumber(exchangeRates[currency].ask);
  }

  transformToValidNumber(value) {
    return Number(value).toFixed(2);
  }

  convertValue({ value, exchangeRates, currency }) {
    const { transformToValidNumber } = this;
    return transformToValidNumber(value * exchangeRates[currency].ask);
  }

  removeExpense({ current, remove }) {
    const { sendToState } = this.props;
    const newExpenses = current.filter((expense) => expense.id !== remove.id);
    sendToState(newExpenses);
  }

  renderExpenses() {
    const { wallet: { expenses } } = this.props;
    const {
      getCurrencyName,
      getCurrencyValue,
      convertValue,
    } = this;

    return expenses.map((data) => {
      const { id, description, tag, method, value } = data;
      const { removeExpense } = this;
      return (
        <tr key={ `${id}-${description}` }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ getCurrencyName(data) }</td>
          <td>{ getCurrencyValue(data) }</td>
          <td>{ convertValue(data) }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              onClick={ () => removeExpense({ remove: data, current: expenses }) }
              className="delete-btn"
              data-testid="delete-btn"
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { renderExpenses } = this;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { renderExpenses() }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.defaultProps = {
  wallet: {
    expenses: [],
  },
};

Table.propTypes = {
  wallet: PropTypes.shape({
    // Solução de Expenses encontrada aqui: https://stackoverflow.com/questions/41771217/react-linter-airbnb-proptypes-array
    expenses: PropTypes.instanceOf(Array),
  }),
  sendToState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  sendToState: (state) => dispatch(refreshExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
