// Generic accept const is required inside of header for all payloads
const accept = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const createGet = (token) => {
  const authorization = token
    ? { Authorization: token }
    : {};

  const payload = {
    method: 'GET',
    headers: {
      ...accept,
      ...authorization,
    },
  };
  return payload;
};

const createPost = (body, token) => {
  const authorization = token
    ? { Authorization: token }
    : {};

  const payload = {
    method: 'POST',
    headers: {
      ...accept,
      ...authorization,
    },
    body: JSON.stringify(body),
  };
  return payload;
};

const createPut = (body, token) => {
  const authorization = token
    ? { Authorization: token }
    : {};

  const payload = {
    method: 'PUT',
    headers: {
      ...accept,
      ...authorization,
    },
    body: JSON.stringify(body),
  };
  return payload;
};

const payloads = {
  createGet,
  createPost,
  createPut,
};

export default payloads;
