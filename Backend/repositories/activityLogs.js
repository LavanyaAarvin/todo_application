const ActivityLogs = require('../models/ActivityLogs');

const BaseRepositorySoftDelete = require("./baseRepositorySoftDelete");

class TodoRepository extends BaseRepositorySoftDelete {
    constructor() {
        super(ActivityLogs); // Pass the model to the base repository
    }
}

module.exports = TodoRepository;
