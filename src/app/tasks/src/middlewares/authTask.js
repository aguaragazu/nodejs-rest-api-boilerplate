const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../../../../utils/ApiError');
const taskRoleRights = require('../config/taskRoles');

const verifyCallbackTask = (req, resolve, reject, requiredTaskRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredTaskRights.length) {
    const userRights = taskRoleRights.get(user.role);
    const hasRequiredRights = requiredTaskRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const authTask = (...requiredTaskRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallbackTask(req, resolve, reject, requiredTaskRights))(
      req,
      res,
      next
    );
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = authTask;
