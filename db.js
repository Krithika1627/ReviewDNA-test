const crypto = require('crypto');

const users = [];

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, passwordHash };
}

function createUser({ email, name, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return null;
  }

  const { salt, passwordHash } = hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    name: name.trim(),
    passwordSalt: salt,
    passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  return user;
}

function findUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  return users.find((user) => user.email === normalizedEmail) || null;
}

function findUserById(id) {
  return users.find((user) => user.id === id) || null;
}

function verifyPassword(user, password) {
  const derivedHash = crypto.scryptSync(password, user.passwordSalt, 64);
  const storedHash = Buffer.from(user.passwordHash, 'hex');

  if (derivedHash.length !== storedHash.length) {
    return false;
  }

  return crypto.timingSafeEqual(derivedHash, storedHash);
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { passwordSalt, passwordHash, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  sanitizeUser,
  verifyPassword
};
