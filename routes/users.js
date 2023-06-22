const express = require('express'); //import express
const router  = express.Router(); 

var user_controller = require('../controllers/userController');

router.post('/register', user_controller.register);

router.post('/login', user_controller.login);
// 4. 
module.exports = router;