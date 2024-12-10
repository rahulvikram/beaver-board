
const { usersAdapter } = require('../services/firestoreAdapter');
const { authenticateToken } = require('../index');
const serviceAccount = require('../../service-account.json');
const jwt = require('jsonwebtoken');

module.exports = async (app) => {
    app.post('/login' , async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
      
        let validRequest = true;
        let user;
      
        if (!(email && password)) {
          validRequest = false;
        }
      
        if (validRequest) {
          try {
            user = (await usersAdapter.search('email', '==', email))[0];
            console.log(user)
            validRequest = user.password === password;
          } catch (error) {
            validRequest = false;
          } 
        }
      
        if (!user) {
          validRequest = false;
        }
      
        if (!validRequest) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
      
        // Token generation and cookie setting
        const token = jwt.sign(
          { id: user.id },
          { key: serviceAccount.private_key, passphrase: '' }, 
          { algorithm: 'RS256' }
        );
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      
        return res.status(200).json({ success: true, id: user.id });
      });
      
      app.post('/logout', (req, res) => {
        res.clearCookie('token');
        return res.status(200).json({ success: true });
      });
}