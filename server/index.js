const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

const serviceAccount = require('../service-account.json');
const { initializeApp, cert } = require('firebase-admin/app');
initializeApp({
  credential: cert(serviceAccount)
});

const { authenticateToken } = require('./services/authUtility');

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());

// Register API routes first
const authEndpoints = require('./endpoints/auth');
const classEndpoints = require('./endpoints/class');

authEndpoints(app);
classEndpoints(app);

app.post('/api/info', authenticateToken, async (req, res) => {
  const user = req.user;
  console.log(user);
  user.password = undefined;
  res.status(200).json({ user });
});

// Serve static files and catch-all route after API routes
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
