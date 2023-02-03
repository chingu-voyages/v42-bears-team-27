const { check, validationResult } = require('express-validator');

exports.validateDirectMessage = [
  check('messageHeader')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('Message header can not be empty')
    .bail()

    .isLength({ min: 5 })
    .withMessage('Message header must be at least 5 characters')
    .bail()

    .isLength({ max: 30 })
    .withMessage('Message header can be at most 30 characters')
    .bail(),

  check('messageBody')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('Message body can not be empty')
    .bail()

    .isLength({ min: 20 })
    .withMessage('Message body must be at least 20 characters')
    .bail()

    .isLength({ max: 500 })
    .withMessage('Message body can be at most 500 characters')
    .bail(),

  check('studentID')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('Stuent ID is required')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    return next();
  },
];
