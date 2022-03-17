const fs = require('fs').promises;

// Referência: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
function generateToken(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  let token = '';

  for (let index = 0; index < length; index += 1) {
    const generatedIndex = Math.floor(Math.random() * characters.length);
    token += characters[generatedIndex];
  }
  
  return token;
}

async function getTalkers() {
  return JSON.parse(await fs.readFile('talker.json', 'utf-8'));
}

function updateTalkers(obj) {
  return fs.writeFile('talker.json', JSON.stringify(obj));
}

function isValidRatingNumber(rate) {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return false;
  }
  return true;
}

module.exports = { generateToken, getTalkers, updateTalkers, isValidRatingNumber };