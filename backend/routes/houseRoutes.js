const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const { body } = require('express-validator');
const {authUser} = require("../middleware/authMiddleware");
const {houseValidator} = require("../validators/houseValidator");

router.post('/create', authUser, houseValidator, houseController.createHouse);

router.get('/', houseController.getAllHouses);
router.get('/:id', houseController.getHouse);

module.exports = router;
