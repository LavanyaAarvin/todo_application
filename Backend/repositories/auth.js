const User = require("../models/User");
const BaseRepositorySoftDelete = require("../repositories/baseRepositorySoftDelete");

class AuthRepository extends BaseRepositorySoftDelete {

    constructor() {
        super(User);
    }
};

module.exports = AuthRepository;