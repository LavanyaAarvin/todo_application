const Todo = require('../models/Todo');

const BaseRepositorySoftDelete = require("./baseRepositorySoftDelete");

class TodoRepository extends BaseRepositorySoftDelete {
    constructor() {
        super(Todo); // Pass the model to the base repository
    }
}

module.exports = TodoRepository;
