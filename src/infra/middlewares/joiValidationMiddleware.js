module.exports = ({schema, type}) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[type], { abortEarly: false });

        if(!error) {
            next();
        } else {
            res.status(400).json({ error });
        }

    }
};