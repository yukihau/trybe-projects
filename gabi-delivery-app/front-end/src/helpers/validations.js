const validateEmailAtSymbol = (email) => {
  const emailContainsAtSymbol = email.includes('@');
  if (!emailContainsAtSymbol) return false;

  const emailWithoutAt = email.replace('@', '');
  if (emailWithoutAt.includes('@')) return false;

  return true;
};

const validateEmailDotSymbol = (email) => {
  const emailContainsAtSymbol = email.includes('@');
  if (!emailContainsAtSymbol) return false;

  const atIndex = email.indexOf('@');
  const domain = email.substring(atIndex + 1);
  const emailContainsDotSymbolAfterAt = domain.includes('.');
  if (!emailContainsDotSymbolAfterAt) return false;

  const domainWithoutDot = domain.replace('.', '');
  if (domainWithoutDot.includes('.')) return false;

  return true;
};

const validateEmailName = (email) => {
  const minimumNameLength = 1;
  const atIndex = email.indexOf('@');
  const name = email.substring(0, atIndex);

  if (name.length < minimumNameLength) return false;

  const invalidCharacters = /[ `!#$%^&*()+=[\]{};':"\\|,<>/?~]/;

  if (invalidCharacters.test(name)) return false;

  return true;
};

const validateEmailDomain = (email) => {
  const minimumDomainLength = 3;
  const atIndex = email.indexOf('@');

  const domain = email.substring(atIndex + 1);
  if (domain.length < minimumDomainLength || !domain.includes('.')) return false;

  const invalidCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,<>/?~]/;
  if (invalidCharacters.test(domain)) return false;

  return true;
};

const validateEmail = (email) => {
  const emailHasOneAtSymbol = validateEmailAtSymbol(email);
  const emailHasOneDotSymbol = validateEmailDotSymbol(email);

  if (!emailHasOneAtSymbol || !emailHasOneDotSymbol) return false;

  const emailIsFilled = email !== '';
  const emailHasValidName = validateEmailName(email);
  const emailHasValidDomain = validateEmailDomain(email);

  if (!emailIsFilled || !emailHasValidName || !emailHasValidDomain) {
    return false;
  }

  return true;
};

const validatePassword = (password) => {
  const minLength = 6;
  if (password.length >= minLength) return true;
  return false;
};

const validateName = (name) => {
  const minLength = 12;
  if (name.length >= minLength) return true;
  return false;
};

export {
  validateEmail,
  validatePassword,
  validateName,
};
