const User = require('../models/User');
const ErrorResponse = require("../utils/errorResponse");
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');
const BaseService = require('./baseService');

class AuthService extends BaseService {

    constructor(repository) {
        super(repository)
    }

    async register(data) {

        const { name, email, password, role } = data;

        const existingUser = await this.repository.findOne({email: email});

        if(existingUser) {
            throw new ErrorResponse('User already exists', 400);
        }

        const user = await this.repository.create({ name, email, password, role });
        return user;
    }

    async login(email, password) {
        const user = await this.repository.findOne(
            { email: email },
            { select: '+password' }
        );
        if(!user) {
            throw new ErrorResponse('User not found', 401);
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            throw new ErrorResponse('Incorrect password', 400);
        }

        return user;
    }

}

module.exports = AuthService;