const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendTokenResponse = require('../utils/sendTokenResponse');

class AuthController {

    constructor(authService) {
        this.authService = authService;
    }
    
    /**
     * @desc        Register a new user
     * @route       POST /api/v1/auth/register
     * @access      Public
     * @param {object} req - Request object
     * @param {object} res - Response object
     */
    register = asyncHandler(async (req, res, next) => {
        console.log("Register");
        const user = await this.authService.register(req.body);
        // sendTokenResponse(user, 200, res);
        res.status(201).json({ success: true, message: 'User registered successfully.' });

    })

    /**
     *  @desc       Login a user
     *  @route      POST /api/v1/auth/login
     *  @access     Public
     *  @param {object} req - Request object
     *  @param {object} res - Response object
     */
    login = asyncHandler(async (req, res, next) => {

        console.log("Login");
        const { email, password } = req.body;
        if(!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 400));
        }
        const user = await this.authService.login(email, password);

        sendTokenResponse(user, 200, res);

    });

    /**
     * @desc    Logout User
     * @route   POST /api/v1/auth/logout
     * @access  Private
     */
    logout = asyncHandler(async (req, res, next) => {
        console.log("Logout");
        // Send a success response
        res.status(200).json({
            success: true,
            message: "Logged out successfully..!!!"
        });
    });

}

module.exports = AuthController;