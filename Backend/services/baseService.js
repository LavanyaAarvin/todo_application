class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    create(data) {
        return this.repository.create(data);
    }

    find(filter) {
        return this.repository.find(filter)
    }

    findAll(filter, queryOptions) {
        return this.repository.findAll(filter, queryOptions);
    }

    findById(id, queryOptions) {
        return this.repository.findById(id, queryOptions);
    }

    updateById(id, data) {
        return this.repository.updateById(id, data);
    }

    deleteById(id) {
        return this.repository.deleteById(id);
    }

    findOne(filter, queryOptions) {
        return this.repository.findOne(filter, queryOptions);
    }
}

module.exports = BaseService;
