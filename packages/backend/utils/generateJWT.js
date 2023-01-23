const jwt = require('jsonwebtoken');

const generateJWT = (payload) =>
  jwt.sign(payload, process.env.JWT_KEY, {
    subject: payload.email,
    expiresIn: '14d',
    algorithm: 'HS256',
  });

module.exports = generateJWT;
