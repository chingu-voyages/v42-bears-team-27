const { check, validationResult } = require('express-validator');

exports.validateStudent = [
  check('fullName')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('fullName can not be empty')
    .bail()

    .isLength({ min: 3 })
    .withMessage('fullName must be at least 3 characters')
    .bail()

    .isLength({ max: 60 })
    .withMessage('fullName can be at most 60 characters')
    .bail(),

  check('email')
    .trim()

    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail()

    .isEmail()
    .withMessage('Invalid email address')
    .bail()

    .normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    return next();
  },
];
