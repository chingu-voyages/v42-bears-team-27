const { check, validationResult } = require('express-validator');

exports.validateTeacher = [
  check('title')
    .trim()
    .escape()

    .isLength({ max: 10 })
    .withMessage('Title can be at most 10 characters')
    .bail(),

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

  check('password')
    .trim()
    .escape()

    .notEmpty()
    .withMessage('Password can not be empty')
    .bail()

    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .bail(),

  check('confirmPassword')
    .trim()
    // custom validation to check that passwords match
    .custom(async (confirmPassword, { req }) => {
      const { password } = req.body;

      if (password !== confirmPassword) {
        throw new Error('Passwords must be the same');
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    return next();
  },
];
