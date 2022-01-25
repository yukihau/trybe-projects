export const SAVE_LOGIN = 'SAVE_LOGIN';
export const GET_API = 'GET_API';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const NEXT_QUESTION = 'NEXT_QUESTION';

// Does not use API
export function saveLogin(loginInfo) {
  return {
    type: SAVE_LOGIN,
    payload: {
      loginInfo,
    },
  };
}

// Request to the API
export function getApi() {
  return {
    type: GET_API,
  };
}

// If the request was successfull return the results
export function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    payload: token,
  };
}

export function saveQuestions(json) {
  return {
    type: SAVE_QUESTIONS,
    payload: json.results,
  };
}

export function saveGravatar(url) {
  return {
    type: SAVE_GRAVATAR,
    payload: url,
  };
}

// Treats the error if the request failed
export function failedRequest(error) {
  return {
    type: FAILED_REQUEST,
    payload: error,
  };
}

export function nextQuestion(goToNext) {
  return {
    type: NEXT_QUESTION,
    payload: goToNext,
  };
}

// fetchApi das questões foi colocado no arquivo "triviaApi" e seu nome mudado para "fetchQuestions"
