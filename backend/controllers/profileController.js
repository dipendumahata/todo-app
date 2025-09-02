const userModel = require('../models/userModel');

exports.getProfile = (req, res) => {
  const p = userModel.getProfile();
  if (!p) return res.status(404).json({ error: 'profile not found' });
  res.json(p);
};

exports.saveProfile = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || name.length < 3) return res.status(400).json({ error: 'name required (min 3 chars)' });
  if ((!email || email.trim() === '') && (!phone || phone.trim() === '')) {
    return res.status(400).json({ error: 'email or phone required' });
  }
  const profile = { name, email: email || null, phone: phone || null, userId: req.user.id };
  const saved = userModel.saveProfile(profile);
  res.json(saved);
};
