module.exports = {

    extractPagination(query) {
        const page = query.page * 1 || 1;
        const limit = query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        return { page, limit, skip };
    }

}