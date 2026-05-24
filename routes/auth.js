const express = require('express');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, sanitizeUser, verifyPassword } = require('../db');

const router = express.Router();

function createToken(user) {
  const jwt_secret_key="jwt_secret_key";
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET || jwt_secret_key,
    { expiresIn: '1h' }
  );
}

router.post('/register', (req, res) => {
  const { email, name, password } = req.body || {};

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Email, name, and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  const user = createUser({ email, name, password });

  if (!user) {
    return res.status(409).json({ message: 'A user with that email already exists.' });
  }

  return res.status(201).json({
    user: sanitizeUser(user),
    token: createToken(user)
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = findUserByEmail(email);

  if (!user || !verifyPassword(user, password)) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  return res.json({
    user: sanitizeUser(user),
    token: createToken(user)
  });
});

module.exports = router;
