var express = require('express');
var router = express.Router();
var controller = require('../controllers/moviesController')
var auth = require('../middlewares/auth')
var isAdmin = require('../middlewares/isAdmin')

router.post('/', [auth.verify, isAdmin.check], controller.create);
router.put('/:id', [auth.verify, isAdmin.check], controller.update);
router.delete('/:id', [auth.verify, isAdmin.check], controller.delete);

router.get('/', controller.list);
router.get('/:id', controller.find);

router.get('/:id/reviews', controller.reviews);
router.post('/:id/reviews', auth.verify,controller.addReview);

module.exports = router;
