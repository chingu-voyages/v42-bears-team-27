const { check, validationResult } = require('express-validator');

exports.validateStudent = [
  check('forename')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('forename can not be empty')
    .bail()

    .isLength({ min: 3 })
    .withMessage('forename must be at least 3 characters')
    .bail()

    .isLength({ max: 25 })
    .withMessage('forename can be at most 25 characters')
    .bail(),
  check('surname')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('surname can not be empty')
    .bail()

    .isLength({ min: 3 })
    .withMessage('surname must be at least 3 characters')
    .bail()

    .isLength({ max: 25 })
    .withMessage('surname can be at most 25 characters')
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
