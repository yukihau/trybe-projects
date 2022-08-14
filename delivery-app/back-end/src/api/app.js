const express = require('express');
const path = require('path');
const router = require('../routes');
require('dotenv/config');

class App { 
    constructor() {
        this.app = express();
        this.middlewares();
        this.config();
    }

    middlewares() {
        this.app.use(express.json());
    }

    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
          };
      
        this.app.use(accessControl);
        this.app.use(
            '/images',
            express.static(path.resolve(__dirname, '..', '..', 'public', 'images')),
        );
        this.app.use('/', router);
    }

    start(PORT) {
        this.app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
}

module.exports = App;
