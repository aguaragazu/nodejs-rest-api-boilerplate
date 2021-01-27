const { roles, roleRights } = require('../../../../config/roles');

const taskRoleRights = new Map();
const userRight = roleRights.get(roles[0]);
const adminRight = roleRights.get(roles[1]);

userRight.push('manageTasks');
taskRoleRights.set(roles[0], userRight);
adminRight.push('manageTasks');
adminRight.push('getTasks');
taskRoleRights.set(roles[1], adminRight);

module.exports = {
  taskRoleRights,
};
