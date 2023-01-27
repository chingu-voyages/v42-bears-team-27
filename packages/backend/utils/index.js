/* eslint global-require: 0 */
module.exports = {
  ...require('./generatePassword'),
  ...require('./email/sendEmail'),
};
