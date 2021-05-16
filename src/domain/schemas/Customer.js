const joi = require('joi');
const Genre = require('../enums/Genre'),
    SchemaType = require('../enums/SchemaType');

const schemas = {

    newCustomerBody: {
        schema: joi.object().keys({
            name: joi.string()
                .max(80)
                .required(),
            genre: joi.string()
                .valid(Genre.FEMININE, Genre.MASCULINE)
                .required(),
            birth_date: joi.date()
                .max('now')
                .iso()
                .required(),
            city_id: joi.string()
                .uuid()
                .required()
        }),
        type: SchemaType.BODY
    },

    patchCustomerNameBody: {
        schema: joi.object().keys({
            name: joi.string()
                .max(80)
                .required()
        }),
        type: SchemaType.BODY
    },

    query: {
        schema: joi.object().keys({
            name: joi.string()
                .max(80),
            page: joi.number()
                .integer()
                .min(0),
            limit: joi.number()
                .integer()
                .min(0).max(100)
        }),
        type: SchemaType.QUERY
    },

    params: {
        schema: joi.object().keys({
            customer_id: joi.string().guid({ version: ['uuidv4'] }).required()
        }),
        type: SchemaType.PARAMS
    }

};

module.exports = schemas;