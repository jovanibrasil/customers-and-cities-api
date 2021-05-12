const SchemaType = require('../enums/SchemaType');
const joi = require('joi');

const schema = {

    newCity: {
        schema: joi.object().keys({
            name: joi.string()
                .max(80)
                .required(),
            state: joi.string()
                .max(80)
                .required()
        }),
        type: SchemaType.BODY
    },

    query: {
        schema: joi.object().keys({
            name: joi.string()
                .max(80),
            state: joi.string()
                .max(80),
            page: joi.number()
                .integer()
                .min(0),
            limit: joi.number()
                .integer()
                .min(0).max(100)
        }),
        type: SchemaType.QUERY
    }

}

module.exports = schema;