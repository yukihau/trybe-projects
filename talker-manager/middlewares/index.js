const { generateToken, isValidRatingNumber } = require('../helpers');

const talkErrorMessage = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

// Referência: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
function validateEmail(req, res, next) {
  const { email } = req.body;
  const regexp = /\S+@\S+\.\S+/;
  const result = regexp.test(email);

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!result) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
}

function sendToken(req, res) {
  res.status(200).json({
    token: generateToken(16),
  });
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json(talkErrorMessage);
  }

  next();
}

// Referência: https://regexland.com/regex-dates/
function validateDate(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  const regexp = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json(talkErrorMessage);
  }

  if (!regexp.test(watchedAt)) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
}

function validateRating(req, res, next) {
  const { talk: { rate } } = req.body;

  if ((!rate || rate === '') && rate !== 0) {
    return res.status(400).json(talkErrorMessage);
  }

  if (!isValidRatingNumber(rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
}

module.exports = {
  validateEmail,
  validatePassword,
  sendToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRating,
};
