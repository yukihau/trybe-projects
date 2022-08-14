const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
module.exports = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ error: 'Token not provided' });
        // const [, token] = req.headers.authorization.split(' ');
        // if (!token) return res.status(401).json({ error: 'Token not provided' });
        try {
            const decoded = jwt.verify(req.headers.authorization, secret);
            console.log(decoded);
            req.user = decoded;
            return next();
        } catch (e) {
            return res.status(401).json({ error: 'Invalid token' });
        }
};