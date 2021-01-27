const httpStatus = require('http-status');
const { pick, ApiError, catchAsync } = require('../../../../utils');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user);
  res.status(httpStatus.CREATED).send(task);
});

const getTasks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['completed']);
  Object.assign(filter, req.user.role !== 'admin' ? { owner: req.user._id } : {});
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const tasks = await taskService.getTasks(filter, options);
  res.send(tasks);
});

const getTask = catchAsync(async (req, res) => {
  const filter = {
    _id: req.params.taskId,
    ...(req.user.role !== 'admin' && { owner: req.user._id }),
  };
  const task = await taskService.getTask(filter);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  res.send(task);
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTask(req.params.taskId, req.body, req.user);
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTask(req.params.taskId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
