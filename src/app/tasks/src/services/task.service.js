const httpStatus = require('http-status');
const ApiError = require('../../../../utils/ApiError');
const { Task } = require('../models');

const createTask = async (taskBody, user) => {
  const task = await Task.create({ ...taskBody, owner: user._id });
  return task;
};

const getTask = async (filter) => {
  const task = await Task.findOne(filter);
  return task;
};

const updateTask = async (taskId, updateBody, user) => {
  const task = await getTask(taskId, user);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updateBody);
  // Object.keys(updateBody).forEach(update => (task[update] = updateBody[update]));
  await task.save();
  return task;
};

const deleteTask = async (taskId, user) => {
  const task = await getTask(taskId, user);
  await task.remove();
  return task;
};

const getTasks = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTasks,
};
