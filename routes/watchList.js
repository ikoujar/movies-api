const express = require('express');
const router = express.Router();
const controller = require('../controllers/watchedListController')
const auth = require('../middlewares/auth')

router.get('/', auth.verify, controller.list);
router.post('/', auth.verify, controller.add);
router.delete('/:movie', auth.verify, controller.delete);

module.exports = router;
