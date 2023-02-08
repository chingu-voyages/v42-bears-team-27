const { check, validationResult } = require('express-validator');

exports.validateMarkMessageAsReadRequest = [
  check('messageID')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('messageID can not be empty')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    return next();
  },
];
