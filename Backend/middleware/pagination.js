const paginate = async (model, page, limit, search = {}, sort = { createdAt: -1 }) => {
    const skip = (page - 1) * limit;
    const total = await model.countDocuments(search);
    
    const results = await model
        .find(search)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    return {
        success: true,
        total,
        page,
        limit,
        data: results
    };
};

module.exports = paginate;
