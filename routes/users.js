const express = require('express');
var { register } = require('../controllers/userController');

const router = express.Router();

router.post('/', register);


module.exports = router;