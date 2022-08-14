import fetch from 'node-fetch';

const GENERIC_ERROR_MESSAGE = `
  There was an error on our end! That, or the servers are offline.
`;

const validateUserInDatabase = async (payload) => {
  try {
    const response = await fetch('http://localhost:3001/login', payload);
    const json = await response.json();
    if (json.error || !json.name) return { success: false, json: { error: json.error } };
    return { success: true, json };
  } catch (error) {
    console.log(error);
    return { success: false, json: { error: GENERIC_ERROR_MESSAGE } };
  }
};

const fetchProducts = async (payload) => {
  try {
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export {
  validateUserInDatabase,
  fetchProducts,
};
