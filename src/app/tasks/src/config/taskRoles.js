const { roles, roleRights } = require('../../../../config/roles');

const taskRoleRights = new Map();

const userRight = roleRights.get(roles[0]);
userRight.push('manageTask');
taskRoleRights.set(roles[0], userRight);

const adminRight = roleRights.get(roles[1]);
adminRight.push('manageTask');
adminRight.push('getTask');
taskRoleRights.set(roles[1], adminRight);

module.exports = {
  taskRoleRights,
};
