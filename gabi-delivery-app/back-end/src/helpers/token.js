const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

module.exports = {
    verify(token) {
        return jwt.verify(token, jwtKey);
    },
    generate(email, role) {
        return jwt.sign({ email, role }, secret,
            { expiresIn: '365d' });
    },
}; 