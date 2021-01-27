const express = require('express');

// modulos
const taskRoute = require('./tasks/src/routes/v1/task.route');

const router = express.Router();

router.use('/tasks', taskRoute);

module.exports = router;
