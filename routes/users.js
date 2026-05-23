const express = require('express');
const authMiddleware = require('../middleware/auth');
const { findUserById, sanitizeUser } = require('../db');

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  const user = findUserById(req.user.sub);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json({ user: sanitizeUser(user) });
});

module.exports = router;
