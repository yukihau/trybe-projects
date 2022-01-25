import {
  SAVE_LOGIN, SAVE_GRAVATAR, GET_API, SAVE_TOKEN, FAILED_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  user: '',
  email: '',
  token: '',
  isFetching: false,
  score: 0,
  gravatar: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      email: action.payload.loginInfo.email,
      user: action.payload.loginInfo.user,
    };

  case SAVE_GRAVATAR:
    return {
      ...state,
      gravatar: action.payload,
    };

  case GET_API:
    return {
      ...state,
      isFetching: true,
    };

  case SAVE_TOKEN:
    return {
      ...state,
      token: action.payload,
      isFetching: false,
    };

  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };

  default:
    return state;
  }
}
