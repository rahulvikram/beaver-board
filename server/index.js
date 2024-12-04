const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('./service-account.json');

// initialize the firebase app
initializeApp({
  credential: cert(serviceAccount) // use the service account to authenticate
});

// get the firestore database
const db = getFirestore();

// test function
const authenticateUser = async (name, email, password) => {
  try {
    const doc = db.collection('users'); // get the user collection
    const snapshot = await doc.where('email', '==', email).get();
    
    // if user isn't found, we want to create a new user
    if (snapshot.empty) {
      const newUser = {
        email: email,
        password: password,
        name: name,
      }
      await doc.add(newUser); // add the new user to the entire users collection
      return newUser; // return the new user
    }

    // if user is found, we want to return the user
    const user = snapshot.docs[0];
    return user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

// We will need to make database calls for the following scenarios:
  // User login, access user collection
  // On user login, access classes collection
  // On user login, access assignments collection


// Express
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Serve static files from 'dist' directory
// occurs when 'npm run build' is executed
app.use(express.static(path.join(__dirname, '../dist')))


// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handle SPA routing - this handles all routes that are not defined in the server, but are defined via vue routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

