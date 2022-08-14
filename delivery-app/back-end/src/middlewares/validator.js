module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
    return next();
};