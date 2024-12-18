const { usersAdapter } = require('../services/firestoreAdapter');
const serviceAccount = require('../../service-account.json');
const jwt = require('jsonwebtoken');

module.exports = async (app) => {
    app.post('/api/login' , async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
      
        let validRequest = true;
        let user;
      
        if (!(email && password)) {
          validRequest = false;
        }
      
        if (validRequest) {
          usersQuery = await usersAdapter.search('email', '==', email);

          if (usersQuery.length === 0) {
            validRequest = false;
          } else {
            user = usersQuery[0];
            console.log(user)
            validRequest = user.password === password;
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
      
      app.post('/api/logout', (req, res) => {
        res.clearCookie('token');
        return res.status(200).json({ success: true });
      });
}