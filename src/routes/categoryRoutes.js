const express = require("express");
const router = express.Router();

const { createCategory, getCategoryById, getAllCategories, deleteCategoryById, updateCategoryById } = require("../controllers/categoryControllers")

router.post('/', createCategory);
router.get('/:id', getCategoryById);
router.get('/', getAllCategories);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryById);

module.exports = router;