const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');
const userService = require("../services/user");

class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    /**
     * @desc     Gell all users
     * @route    GET /api/v1/users/
     * @access   Private
    */
    getAllUsers = asyncHandler(async (req, res, next) => {

        console.log("Get All Users");
        const users = await this.userService.getAllUsers(req, res, next);
        res.status(200).json(users);

    });
    

    /**
     * @desc     Gell user by id
     * @route    GET /api/v1/users/:id
     * @access   Private
     * @param    {*} id ( userId )
    */
    getUserById = asyncHandler(async (req, res, next) => {

        console.log("Get User By Id");
        const userId = req.params.id;
        const user = await this.userService.getUserById(userId);
        res.status(200).json(successResponse(user));

    });

    /**
     * @desc     Update user by id
     * @route    PUT /api/v1/users/:id
     * @access   Private
     * @param    {*} id ( userId )
    */
    updateUserById = asyncHandler(async (req, res, next) => {

        console.log("Update User By Id");
        const userId = req.params.id;
        const user = await this.userService.updateUserById(userId, req.body);
        res.status(200).json(successResponse(user));

    });

    /**
     * @desc     Delete user by id
     * @route    DELETE /api/v1/users/:id
     * @access   Private
     * @param    {*} id ( userId )
    */
    deleteUserById = asyncHandler(async (req, res, next) => {

        console.log("Delete User By Id");
        const userId = req.params.id;
        const user = await this.userService.deleteById(userId);
        if(!user) {
            return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, message: 'User Deleted Successfully..!!!' });

    });
}

module.exports = UserController;
