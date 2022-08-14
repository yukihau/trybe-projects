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

const validateUserData = async (user) => {
  const keysAreValid = verifyUserKeys(user);
  if (!keysAreValid) return false;

  const valuesAreValid = verifyValues(user);
  if (!valuesAreValid) return false;

  return true;
};

const getTotalPrice = (cart) => cart
  .map(({ price, quantity }) => ({ price, quantity }))
  .reduce((a, b) => a + (b.price * b.quantity), 0);

const getLeadingZero = (number) => {
  const leadingZeroMax = 10;
  return number < leadingZeroMax ? `0${number}` : number;
};

const getFormattedDate = (dbDate) => {
  const date = new Date(dbDate);
  const day = date.getDate();
  const month = getLeadingZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatNumberIntoLengthOf4 = (num) => {
  const leadingZeroLength = 4;
  let formattedNum = num.toString();
  while (formattedNum.length < leadingZeroLength) formattedNum = `0${formattedNum}`;
  return formattedNum;
};

const helper = {
  verifyValues,
  verifyUserKeys,
  validateUserData,
  getTotalPrice,
  getFormattedDate,
  formatNumberIntoLengthOf4,
};

export default helper;
