import {
  getApi, failedRequest, saveToken, saveQuestions,
} from '../redux/actions';

const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

export function fetchToken() {
  return fetch(TOKEN_URL)
    .then((response) => response.json());
}

export function fetchTokenThunk() {
  return (dispatch) => {
    dispatch(getApi());
    fetchToken()
      .then(({ token }) => {
        localStorage.setItem('token', token);
        dispatch(saveToken(token));
      })
      .catch((error) => dispatch(failedRequest(error)));
  };
}

export function fetchQuestionsThunk() {
  return (dispatch) => {
    const playerToken = localStorage.getItem('token');
    const TRIVIA_URL = `https://opentdb.com/api.php?amount=5&token=${playerToken}`;
    dispatch(getApi());
    return fetch(TRIVIA_URL)
      .then((result) => result.json())
      .then((questions) => dispatch(saveQuestions(questions)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
