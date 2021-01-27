const express = require('express');
const auth = require('../../../../../core/middlewares/auth');
const authTask = require('../../middlewares/authTask');
const validate = require('../../../../../core/middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(taskValidation.createTask), taskController.createTask)
  .get(auth(), validate(taskValidation.getTasks), taskController.getTasks);

router
  .route('/:taskId')
  .get(authTask('getTasks'), validate(taskValidation.getTask), taskController.getTask)
  .patch(authTask('manageTasks'), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(authTask('manageTasks'), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;
