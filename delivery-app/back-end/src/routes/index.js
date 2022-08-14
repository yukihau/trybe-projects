const authentication = require('./authentication');
const sales = require('./sales');
const customer = require('./customer');
const users = require('./users');

const router = [authentication, customer, sales, users];

module.exports = router;