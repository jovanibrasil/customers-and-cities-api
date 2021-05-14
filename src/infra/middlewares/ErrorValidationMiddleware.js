module.exports = (err, req, res, next) => {  
    if(err) {
        const { http_status, detail } = err;
        res.status(http_status).json({ detail, http_status });
    }
};