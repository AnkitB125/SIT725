const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/', itemController.getItems);
router.post('/', itemController.addItem);
router.get('/seed', itemController.seedDatabase);

module.exports = router;
