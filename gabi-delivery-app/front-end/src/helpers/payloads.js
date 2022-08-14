const createGenericPayload = (body) => {
  const payload = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return payload;
};

const createPostPayload = (body) => {
  const genericPayload = createGenericPayload(body);
  const payload = {
    method: 'POST',
    ...genericPayload,
  };
  return payload;
};

const createGetPayload = (body) => {
  const genericPayload = createGenericPayload(body);
  const payload = {
    method: 'GET',
    ...genericPayload,
  };
  return payload;
};

export {
  createPostPayload,
  createGetPayload,
};
