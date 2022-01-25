// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  currencyToExchange: 'BRL',
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'NEW_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case 'REFRESH_EXPENSES':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'REQUEST_DATA':
    return { ...state, isFetching: true };
  case 'REQUEST_SUCCESS':
    return {
      ...state,
      currencies: Object.keys(action.payload),
      isFetching: false,
    };
  case 'REQUEST_FAILED':
    return { ...state, isFetching: false };
  default:
    return state;
  }
};

export default wallet;
