import { GET_API, SAVE_QUESTIONS, FAILED_REQUEST, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  payload: '',
  error: '',
  score: 0,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      isFetching: true,
    };

  case SAVE_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      payload: action.payload,
    };

  case NEXT_QUESTION:
    return {
      ...state,
      goToNext: action.payload.goToNext,
      score: action.payload.score,
    };

  case FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default questions;
