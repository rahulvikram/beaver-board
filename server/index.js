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
async function getDueDate() {
  try {
    const doc = db.collection('users')
                .doc('OBz3Qb0DVHKyJtAvK6e8')
                .collection('classes') 
                .doc('0lv92s48vK')
                .get();
    if (doc.exists) {
      const dueDate = doc.data().assignments[0].due.toDate();
      return dueDate;
    }
    return null;
  } catch (error) {
    console.error('Error fetching due date:', error);
    throw error;
  }
}

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

