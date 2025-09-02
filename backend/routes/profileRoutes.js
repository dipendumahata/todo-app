const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profileController');
const authCtrl = require('../controllers/authController');

router.get('/', authCtrl.verifyToken, profileCtrl.getProfile);
router.post('/', authCtrl.verifyToken, profileCtrl.saveProfile);

module.exports = router;
