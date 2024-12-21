const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const protectRoutes = asyncHandler(async (req, res, next) => {
    console.log("Checking authorization");

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    
    try {
        // Verify the token with the secret key and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        // Set the user ID and role in the request for downstream middlewares
        req.userId = decoded.id;
        req.userRole = decoded.role;

        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return next(new ErrorResponse('Token is not valid', 401));
    }
});

// Role-based Authorization Middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return next(new ErrorResponse('User role is not authorized to access this route', 403));
        }
        next();
    };
};

module.exports = {
    protectRoutes,
    authorizeRoles
};