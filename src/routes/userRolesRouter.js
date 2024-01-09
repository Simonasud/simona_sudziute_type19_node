// userRolesRouter.js
const express = require('express');

const router = express.Router();
const userRolesController = require('../controllers/userRolesController');

router.get('/user_roles', userRolesController.getAllUserRoles);

module.exports = router;
