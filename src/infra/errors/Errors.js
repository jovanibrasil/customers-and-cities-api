module.exports = {

    NOT_FOUND_ERROR: ({ message }) => ({
        detail: { message }, http_status: 404
    }),

    BUSINESS_ERROR: ({ message }) => ({
        detail: { message }, http_status: 422
    }),

    CONTRACT_ERROR: ({ message, error_detail }) => ({
        detail: { message, error_detail }, http_status: 400
    })

};