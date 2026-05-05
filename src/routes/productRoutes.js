const express = require("express");
const router = express.Router();

const { createProduct, getProductById, getAllProductList, getAllProductList_ByCreatedBy, getProductById_ByCreatedBy, updateProductById, deleteProductById } = require("../controllers/productControllers")

// ✅ Specific routes first
router.get('/admin/all/:adminId', getAllProductList_ByCreatedBy);
router.get('/admin/:id/:adminId', getProductById_ByCreatedBy);

// ✅ General routes
router.post('/', createProduct);
router.get('/', getAllProductList);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

module.exports = router;