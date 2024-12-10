const { usersAdapter } = require('./firestoreAdapter');
const jwt = require('jsonwebtoken');
const serviceAccount = require('../../service-account.json');

async function authenticateToken(req, res, next) {
    // Retrieve the token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
    }
  
    // Verify the token
    jwt.verify(token, serviceAccount.private_key, async (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Access Denied: Invalid Token' });
      }
      req.userId = user.id;
  
      req.user = (await usersAdapter.search('id', '==', req.userId))[0];
      next(); // Proceed to the next middleware or route handler
    });
  }

module.exports = { authenticateToken };