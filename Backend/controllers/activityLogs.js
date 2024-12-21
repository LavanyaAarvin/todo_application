const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const successResponse = require("../utils/successResponse");

class ActivityLogsController {
    constructor(activityLogsService) {
        this.activityLogsService = activityLogsService;
    }

    /**
     * @desc    Activity logs Lists
     * @route   GET /api/v1/activity-logs
     * @access  Private
     */
    getActivityLogs = asyncHandler(async (req, res, next) => {
        console.log("List of activity logs");
        let result = await this.activityLogsService.getActivityLogs(res.advancedResults.data);
        res.advancedResults.data = result
        res.status(200).json(res.advancedResults);
    });
    

    
    /**
     * @desc    Create Activity Log
     * @route   GET /api/v1/activity-logs
     * @access  Private
     */
    createActivityLog = asyncHandler(async (req, res, next) => {
        console.log("Create activity logs");

        const data = { userId, action, todoId}
        const createdLog = await this.activityLogsService.createActivityLog(data);
        res.status(201).json(successResponse(createdLog));
    })

}

module.exports = ActivityLogsController;
