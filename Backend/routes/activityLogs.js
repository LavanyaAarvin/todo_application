const express = require('express');
const router = express.Router();
const { activityLogsController } = require('../bootstrap');
const {protectRoutes} = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const ActivityLogs = require('../models//ActivityLogs');

router.get(
    '/',
    advancedResults(ActivityLogs, [
      { path: 'userDetails', select: 'name email' }, // Populate user details
      { path: 'todoDetails', select: 'title description' }, // Populate todo details
    ]),
    activityLogsController.getActivityLogs
  );
module.exports = router;
