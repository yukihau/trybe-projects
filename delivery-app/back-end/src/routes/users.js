const express = require('express');

const routerUsers = express.Router();
const controller = require('../controller/users');

routerUsers.get(
  '/users',
  controller.findAll,
);

module.exports = routerUsers;