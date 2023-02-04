const { check, validationResult } = require('express-validator');

exports.validateLoginCredentials = [
  check('email')
    .trim()

    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail()

    .isEmail()
    .withMessage('Invalid email address')
    .bail()

    .normalizeEmail(),

  check('password')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('Password can not be empty')
    .bail()

    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    return next();
  },
];
