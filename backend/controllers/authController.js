const jwt = require('jsonwebtoken');
const { user } = require('../models/userModel');

const SECRET = 'my_super_secret_junior_project'; 

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username: user.username, id: user.id }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'invalid credentials' });
};

exports.verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'malformed token' });
  const token = parts[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'invalid token' });
    req.user = decoded;
    next();
  });
};
