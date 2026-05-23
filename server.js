const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const users = [
  { id: 1, email: "admin@test.com" },
  { id: 2, email: "user@test.com" }
];

app.get("/admin/users", (req, res) => {
  res.json(users);
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
