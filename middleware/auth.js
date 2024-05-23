const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = async (req, res, next) => {
  const idToken = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!idToken) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized', details: error.message });
  }
};

module.exports = auth;
