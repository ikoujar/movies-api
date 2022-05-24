var express = require('express');
var router = express.Router();
var controller = require('../controllers/authController')
var auth = require('../middlewares/auth')

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/me', auth.verify, controller.me)

module.exports = router
