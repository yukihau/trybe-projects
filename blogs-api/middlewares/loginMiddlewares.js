const EMAIL_DOES_NOT_EXIST = '"email" is required';
const EMAIL_MUST_NOT_BE_EMPTY = '"email" is not allowed to be empty';
const PASSWORD_DOES_NOT_EXIST = '"password" is required';
const PASSWORD_MUST_NOT_BE_EMPTY = '"password" is not allowed to be empty';

// Email
const emailExists = (user) => typeof user.email !== 'undefined' && user.email !== 'null';
const emailIsFilled = (email) => email.length > 0;

const validateEmail = (req, res, next) => {
  const user = req.body;

  switch (true) {
    case (!emailExists(user)):
      return res.status(400).json({ message: EMAIL_DOES_NOT_EXIST });
    case (!emailIsFilled(user.email)):
      return res.status(400).json({ message: EMAIL_MUST_NOT_BE_EMPTY });
    default:
      next();
  }
};

// Password
const passwordExists = (user) => typeof user.password !== 'undefined' && user.password !== 'null';
const passwordIsFilled = (password) => password.length > 0;

const validatePassword = (req, res, next) => {
  const user = req.body;

  switch (true) {
    case (!passwordExists(user)):
      return res.status(400).json({ message: PASSWORD_DOES_NOT_EXIST });
    case (!passwordIsFilled(user.password)):
      return res.status(400).json({ message: PASSWORD_MUST_NOT_BE_EMPTY });
    default:
      next();
  }
};

module.exports = { validateEmail, validatePassword };