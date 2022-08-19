const Categories = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();

// Create a new Category
router.post('/', Categories.create);

// Retrieve all Categories
router.get('/', Categories.findAll);

// Retrieve a single Category with id
router.get('/:id', Categories.findOne);

// Update a Category with id
router.put('/:id', Categories.update);

// Delete a Category with id
router.delete('/:id', Categories.delete);

// Delte all Categories
router.delete('/', Categories.deleteAll);

module.exports = router;
