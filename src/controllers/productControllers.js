const pool = require("../config/db");

const createProduct = async (req, res) => {
    try{
        const {name, description, price, stock, category_id, created_by} = req.body;
        if(!name || !description || !price || !stock || !category_id || !created_by){
            return res.status(400).json({
                message: "All fields Are required"
            })
        }

        const result = await pool.query(`
            INSERT INTO products (name, description, price, stock, category_id, created_by)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `,[name, description, price, stock, category_id, created_by])

        return res.status(201).json({
            message: "Product created successfully",
            product: result
        });
    } catch (err) {
        console.log("Error in creating product :", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

module.exports = { createProduct };