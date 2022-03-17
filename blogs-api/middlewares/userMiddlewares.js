const INVALID_NAME_LENGTH = '"displayName" length must be at least 8 characters long';
const EMAIL_DOES_NOT_EXIST = '"email" is required';
const INVALID_EMAIL = '"email" must be a valid email';
const PASSWORD_DOES_NOT_EXIST = '"password" is required';
const INVALID_PASSWORD_LENGTH = '"password" length must be 6 characters long';

// Name
const nameExists = (name) => typeof name !== 'undefined' && name !== 'null';
const nameHasAtLeastEightCharacters = (name) => name.length >= 8;

const validateName = (req, res, next) => {
  const { displayName } = req.body;

  switch (true) {
    case (!nameExists(displayName)):
      return res.status(400).json({ message: INVALID_NAME_LENGTH });
    case (!nameHasAtLeastEightCharacters(displayName)):
      return res.status(400).json({ message: INVALID_NAME_LENGTH });
    default:
      next();
  }
};

// Email
const emailExists = (email) => typeof email !== 'undefined' && email !== 'null';
const emailFormatIsValid = (email) => {
  const format = email.split('@');
  return format.length >= 2;
};
const emailPrefixIsValid = (email) => {
  const prefix = email.split('@')[0];
  return prefix.length >= 1;
};
const emailDomainIsValid = (email) => {
  const domain = email.split('@')[1];
  return domain.split('.').length === 2 && domain.length >= 3;
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  switch (true) {
    case (!emailExists(email)):
      return res.status(400).json({ message: EMAIL_DOES_NOT_EXIST });
    case (!emailFormatIsValid(email)):
      return res.status(400).json({ message: INVALID_EMAIL });
    case (!emailPrefixIsValid(email)):
      return res.status(400).json({ message: INVALID_EMAIL });
    case (!emailDomainIsValid(email)):
      return res.status(400).json({ message: INVALID_EMAIL });
    default:
      next();
  }
};

// Password
const passwordExists = (password) => typeof password !== 'undefined' && password !== 'null';
const passwordIsSixCharactersLong = (password) => password.length === 6;

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  switch (true) {
    case (!passwordExists(password)):
      return res.status(400).json({ message: PASSWORD_DOES_NOT_EXIST });
    case (!passwordIsSixCharactersLong(password)):
      return res.status(400).json({ message: INVALID_PASSWORD_LENGTH });
    default:
      next();
  }
};

module.exports = { validateName, validateEmail, validatePassword };