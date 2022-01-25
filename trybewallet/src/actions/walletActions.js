export default function newExpense(state, currencies) {
  return {
    type: 'NEW_EXPENSE',
    payload: {
      ...state,
      exchangeRates: currencies,
    },
  };
}

export function refreshExpenses(expenses) {
  return {
    type: 'REFRESH_EXPENSES',
    payload: expenses,
  };
}

export function requestData() {
  return { type: 'REQUEST_DATA' };
}

export function requestSuccess(json) {
  return { type: 'REQUEST_SUCCESS', payload: json };
}

export function requestFailed(error) {
  return { type: 'REQUEST_FAILED', payload: error };
}
