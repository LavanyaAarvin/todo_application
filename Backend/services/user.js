const paginate = require('../middleware/pagination');
const BaseService = require('./baseService');

class UserService extends BaseService {
    constructor(repository) {
        super(repository)
    }
    

    async getAllUsers(req, res, next) {

        const page = parseInt(req.query.page) || 1; // Get page from query, default to 1
        const limit = parseInt(req.query.limit) || 10; // Get limit from query, default to 10
        const searchTerm = req.query.search || '';

        const searchQuery = {
            $or: [
                { username: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search by username
                { email: { $regex: searchTerm, $options: 'i' } }
            ]
        };

        const users = await paginate(this.repository.model, page, limit, searchQuery);

        return users;
    }

    async getUserById(id) {
        const user = await this.repository.findById(id);
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async updateUserById(id, body) {
        const user = await this.repository.updateById(id, body);
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }

}

module.exports = UserService;