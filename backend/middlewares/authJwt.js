const jwt = require('jsonwebtoken');
const db = require('../models');

const secretKey = process.env.SECRET_KEY;

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.docId = decoded.id;
    req.userType = decoded.userType;
    
    next();
  });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;