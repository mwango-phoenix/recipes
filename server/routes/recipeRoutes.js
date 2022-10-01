const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// App Routes - list all pages to link to recipe controller
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.byCategory);
module.exports = router;