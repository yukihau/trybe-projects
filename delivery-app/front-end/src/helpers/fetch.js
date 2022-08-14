import fetch from 'node-fetch';
import storage from './storage';
import payloads from './payloads';

export const GENERIC_ERROR_MESSAGE = `
  There was an error on our end! That, or the servers are offline.
`;

const route = {
  login: '/login',
  register: '/register',
  users: '/users',
  products: '/customer/products',
  checkout: '/customer/checkout',
  orders: '/customer/orders',
  sales: '/sales',
};

// Generic fetch function that tests for errors
// URL needs to be the same as one of the keys in "route" variable
const fetchFromDb = async (payload, url) => {
  try {
    const response = await fetch(`http://localhost:3001${route[url]}`, payload);
    const json = await response.json();
    if (json.error) {
      return { success: false, json: { error: json.error } };
    }
    return { success: true, json };
  } catch (error) {
    console.log(error);
    return { success: false, json: { error: GENERIC_ERROR_MESSAGE } };
  }
};

const fetchUserId = async () => {
  const currUser = await storage.user.get();
  if (!currUser) return false;

  const payload = payloads.createGet();
  const response = await fetchFromDb(payload, 'users');

  if (!response.success) return response;
  if (response.json.length === 0) return false;

  const currUserId = response.json.find((user) => user.email === currUser.email).id;
  return { success: true, userId: currUserId };
};

const fetchWithParams = async ({ payload, url, id }) => {
  try {
    console.log(id);
    const response = await fetch(`http://localhost:3001${route[url]}/${id}`, payload);
    const json = await response.json();
    if (json.error) {
      return { success: false, json: { error: json.error } };
    }
    return { success: true, json };
  } catch (error) {
    console.log(error);
    return { success: false, json: { error: GENERIC_ERROR_MESSAGE } };
  }
};

export { fetchUserId, fetchWithParams };

export default fetchFromDb;
