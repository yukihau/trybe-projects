const productIdExists = (id) => typeof id !== 'undefined' && id !== 'null';

const validateProductId = (req, res, next) => {
  const { productId } = req.body[0];

  switch (true) {
    case (!productIdExists(productId)):
      return res.status(400).json({ message: '"productId" is required' });
    default:
      next();
  }
};

const quantityExists = (quantity) => typeof quantity !== 'undefined' && quantity !== 'null';
const quantityIsAtLeastOne = (quantity) => quantity >= 1;

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body[0];

  switch (true) {
    case (!quantityExists(quantity)):
      return res.status(400).json({ message: '"quantity" is required' });
    case (!quantityIsAtLeastOne(quantity)):
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    default:
      next();
  }
};

module.exports = { validateProductId, validateQuantity };