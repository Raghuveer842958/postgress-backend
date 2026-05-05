const express = require("express");
const router = express.Router();

const { findProductsBetweenPriceRange } = require("../controllers/analyticsControllers");

router.get('/products/price-range', findProductsBetweenPriceRange);

module.exports = router;