const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'

  if (token) {
    // check that the token is valid
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // bad panda, token has been tampered with
        res.status(401).json({ message: 'Invalid credentials' })
      } else {
        req.decodedJwt = decodedToken
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
