/* eslint global-require: 0 */
module.exports = {
  ...require('./auth'),
  ...require('./studentValidator'),
  ...require('./teacherValidator'),
  ...require('./messageValidator'),
  ...require('./directMessageValidator'),
};
