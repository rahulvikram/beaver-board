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
  origin: function (origin, callback) {
    if (!origin) return callback(null, false);
    try {
      const originHost = new URL(origin).hostname;
      const serverHost = 'localhost';
      if (originHost === serverHost) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } catch (err) {
      callback(new Error('Invalid Origin'));
    }
  }
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.use('/auth', require('./endpoints/auth'));


const authEndpoints = require('./endpoints/auth');
const classEndpoints = require('./endpoints/class');

authEndpoints(app);
classEndpoints(app);

app.post('/info', authenticateToken, async (req, res) => {
  const user = req.user;
  console.log(user);
  user.password = undefined;

  res.status(200).json({ user });
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
