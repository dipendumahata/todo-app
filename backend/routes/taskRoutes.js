const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskController');
const authCtrl = require('../controllers/authController');

// All task routes are protected for demo
router.get('/', authCtrl.verifyToken, taskCtrl.getTasks);
router.post('/', authCtrl.verifyToken, taskCtrl.addTask);
router.put('/:id', authCtrl.verifyToken, taskCtrl.updateTask);
router.delete('/:id', authCtrl.verifyToken, taskCtrl.deleteTask);

module.exports = router;
