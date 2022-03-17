const loginService = require('../services/loginService');

const login = async (req, res) => {
  const user = req.body;

  try {
    const { data, code } = await loginService.login(user);
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login };
