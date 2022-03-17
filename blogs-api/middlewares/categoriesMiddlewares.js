const NAME_DOES_NOT_EXIST = '"name" is required';

const nameExists = (name) => typeof name !== 'undefined' && name !== 'null';

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!nameExists(name)) {
    return res.status(400).json({ message: NAME_DOES_NOT_EXIST });
  }

  next();
};

module.exports = { validateName };
