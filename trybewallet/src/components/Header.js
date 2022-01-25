import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal() {
    const { wallet: { expenses } } = this.props;
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((acc, { exchangeRates, value, currency }) => {
      const convertedValue = value * exchangeRates[currency].ask;
      return (Number(acc) + Number(convertedValue)).toFixed(2);
    }, 0);
    return total;
  }

  render() {
    const { user: { email }, wallet: { currencyToExchange } } = this.props;
    const { calculateTotal } = this;

    return (
      <header>
        <h1>TrybeWallet™</h1>
        <span data-testid="email-field">{ email }</span>
        <div>
          <span data-testid="total-field">
            { calculateTotal() }
            { ' ' }
          </span>
          <span data-testid="header-currency-field">
            { currencyToExchange }
          </span>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  user: ({
    email: '',
  }),
  wallet: {
    currencyToExchange: 'BRL',
    currenciesAreLoaded: false,
  },
};

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  wallet: PropTypes.shape({
    // Créditos pela solução de arrayOf: Denis Jonathan
    // https://github.com/tryber/sd-015-b-project-trybewallet/pull/10/files
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    currencyToExchange: PropTypes.string,
    currenciesAreLoaded: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
