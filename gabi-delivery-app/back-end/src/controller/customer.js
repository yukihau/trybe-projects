const customer = require('../services/customer');

module.exports = {
    productsGetAll: async (req, res) => {
            const products = await (await customer.products()).getAll();
            return res.status(200).json(products);
        },
};
