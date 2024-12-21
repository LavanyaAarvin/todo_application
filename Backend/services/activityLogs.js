const BaseService = require('./baseService');
const ErrorResponse = require('../utils/errorResponse');

class ActivityLogsService extends BaseService {

    constructor(repository) {
        super(repository);
    }

    async createActivityLog(data) {
        return await this.repository.create(data);
    }

    async getActivityLogs(data) {
         // Transform the data into the desired format
         const transformedData = data.map(log => {
            const user = log.userDetails?.[0]; 
            const todo = log.todoDetails?.[0];
    
            const formattedDate = new Date(log.timestamp).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
    
            return {
                message: user
                    ? `${user.name} ${log.action.toLowerCase()} ${todo?.title || 'unknown'} on ${formattedDate}`
                    : `Unknown user ${log.action.toLowerCase()} ${todo?.title || 'unknown'} on ${formattedDate}`,
                timestamp: formattedDate,
            };
        });

        return transformedData
    }

}

module.exports = ActivityLogsService;
