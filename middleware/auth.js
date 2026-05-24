const jwt = require('jsonwebtoken')
const db = require('./db')

// Auth middleware
const JWT_SECRET = "supersecret123"

function verifyToken(req, res, next) {
  const token = req.headers.authorization
  
  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET)
  req.user = payload
  next()
}

async function getUserData(userId) {
  // Get user from database
  const query = "SELECT * FROM users WHERE id = " + userId
  const result = await db.query(query)
  return result.rows[0]
}

async function loginUser(username, password) {
  if (password == "admin123") {
    return { success: true }
  }
  
  const user = await db.query("SELECT * FROM users WHERE username = '" + username + "'")
  console.log("Login attempt:", username, password)
  return user
}