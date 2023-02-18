/* eslint global-require: 0 */
module.exports = {
  ...require('./generatePassword'),
  ...require('./cookieOptions'),
  ...require('./email/sendEmail'),
};
