const verifyValues = async (user) => {
  const valuesAreEmpty = Object.values(user).every((value) => value === '');
  if (valuesAreEmpty) return false;
  return true;
};

const verifyUserKeys = async (user) => {
  const requiredKeys = ['name', 'email', 'role', 'token'];
  const userKeys = Object.keys(user);
  const keysAreCorrect = userKeys.every((key) => key in requiredKeys);
  if (!keysAreCorrect) return false;
};

const checkCurrentUserData = async (user) => {
  const keysAreValid = verifyUserKeys(user);
  if (!keysAreValid) return false;

  const valuesAreValid = verifyValues(user);
  if (!valuesAreValid) return false;

  // Checar se o token é válido abaixo, quando a função estiver pronta

  return true;
};

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

const getUserFromLocalStorage = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return false;

  const userValuesAreEmpty = Object.values(user).every((value) => value === '');
  if (userValuesAreEmpty) return false;

  const currentUserDataIsValid = await checkCurrentUserData(user);
  if (!currentUserDataIsValid) return false;

  return user;
};

export {
  setUserInLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
};
