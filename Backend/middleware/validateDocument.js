const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const mongoose = require('mongoose');

const validateDocument = (Model, getQueryFromReq) => asyncHandler(async (req, res, next) => {
    
    const query = getQueryFromReq(req);

    // Extract the id from the query object
    const id = query._id;
    // Check if the id is a valid Mongoose ObjectId
    if (!mongoose.isValidObjectId(id)) {

        return next(new ErrorResponse(`Invalid ID format`, 400));
    }

    const object = await Model.findOne(query);

    if (!object) {
        
        return next(new ErrorResponse(`${Model?.modelName ?? "Document"} not found`, 404));
    }

    req.foundObject = object;
    next();
});


module.exports = validateDocument;