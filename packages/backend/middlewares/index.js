/* eslint global-require: 0 */
module.exports = {
  ...require('./auth'),
  ...require('./validators/studentValidator'),
  ...require('./validators/teacherValidator'),
  ...require('./validators/messageValidator'),
  ...require('./validators/directMessageValidator'),
};
