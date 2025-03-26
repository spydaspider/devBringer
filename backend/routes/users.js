const express = require("express");
const router = express.Router();
const { signup, login, getAllUsers } = require('../controllers/users.js');
router.post('/signup', signup);
router.post('/login', login);
router.get('/all',getAllUsers);
module.exports = router;
