const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../../utils/ApiError');
const { sendEmail } = require('./email.service');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'El nombre de usuario ya ha sido registrado');
  }
  const user = await User.create(userBody);
  const subject = 'Bienvenido a SPEP-Web! Confirma tu Email';
  const link = `http://localhost:4200/auth/confirm?email=${user.email}&token=${user.confirmationCode}`;
  const text = `Por favor confirma tu Email siguiendo el link: ${link}`;
  const html = `<div><h1><strong>Confirma tu cuenta de ingreso.</strong></h1><p><br />&iexcl;Gracias por registrarte!<br />Necesitamos verificar que la cuenta&nbsp;<strong><a href="mailto:${user.email}">${user.email}</a></strong>&nbsp;es tu E-mail.&nbsp;<br /><br />Para verificar que esta cuenta te pertenece, por favor presiona el siguietne boton:</p><p><a href="${link}">VERFICAR MI EMAIL</a></p><p>&iquest;No funciona? Copia el siguiente link:</p><p><a href="${link}">${link}</a></p></div>`;

  sendEmail(userBody.email, subject, text, html);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
