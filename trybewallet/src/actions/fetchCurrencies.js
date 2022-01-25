import newExpense,
{ requestSuccess, requestFailed, requestData } from './walletActions';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export default function fetchCurrencies() {
  return fetch(URL)
    .then((data) => data.json());
}

export function fetchCurrenciesThunk() {
  return (dispatch) => {
    dispatch(requestData());
    fetchCurrencies()
      .then((response) => dispatch(requestSuccess(response)))
      .catch((error) => dispatch(requestFailed(error)));
  };
}

export function fetchCurrenciesForExpenses(state) {
  return (dispatch) => {
    dispatch(requestData());
    fetchCurrencies()
      .then((response) => dispatch(newExpense(state, response)))
      .catch((error) => dispatch(requestFailed(error)));
  };
}
