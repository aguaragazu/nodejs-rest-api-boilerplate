const { Task } = require('../models');

const createTask = async (taskBody, user) => {
  const task = await Task.create({ ...taskBody, owner: user._id });
  return task;
};

const getTask = async (id) => {
  const task = await Task.findById(id);
  return task;
};

const updateTask = async (task, updateBody) => {
  Object.assign(task, updateBody);
  // Object.keys(updateBody).forEach(update => (task[update] = updateBody[update]));
  await task.save();
  return task;
};

const deleteTask = async (taskId) => {
  const task = await getTask(taskId);
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
