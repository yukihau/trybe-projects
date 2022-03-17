const nameExists = (name) => typeof name !== 'undefined' && name !== 'null';
const nameLengthIsAtLeastFive = (name) => name.length >= 5;

const validateName = (req, res, next) => {
  const { name } = req.body;

  switch (true) {
    case (!nameExists(name)):
      return res.status(400).json({ message: '"name" is required' });
    case (!nameLengthIsAtLeastFive(name)):
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    default:
      next();
  }
};

const quantityExists = (quantity) => typeof quantity !== 'undefined' && quantity !== 'null';
const quantityIsAtLeastOne = (quantity) => quantity >= 1;

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  switch (true) {
    case (!quantityExists(quantity)):
      return res.status(400).json({ message: '"quantity" is required' });
    case (!quantityIsAtLeastOne(quantity)):
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    default:
      next();
  }
};

module.exports = { validateName, validateQuantity };