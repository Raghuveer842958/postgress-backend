const pool = require("../config/db");

const findProductsBetweenPriceRange = async (req, res) => {
    try{
        const { minPrice, maxPrice } = req.query;
        const { created_by } = req.user;
        const result = await pool.query(`
            SELECT * FROM products
            WHERE price BETWEEN 1000 AND 2000
        `)

        return res.status(200).json({
            message: "Products between range is",
            products: result.rows
        })
    } catch (err){
        console.log("error is :", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

module.exports = {
    findProductsBetweenPriceRange
}