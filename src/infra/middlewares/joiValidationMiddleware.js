const Errors = require('../errors/Errors')

module.exports = ({schema, type}) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[type], { abortEarly: false });

        if(!error) {
            next();
        } else {
            throw Errors.CONTRACT_ERROR({ message: 'Invalid fields content', error_detail: error.details });
        }

    }
};