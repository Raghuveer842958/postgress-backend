const pool = require("../config/db");

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(200).json({
                message: "category name is requied"
            });
        }

        const existingCategories = await pool.query(`
            SELECT * FROM categories
            WHERE name = $1
        `, [name]);

        if (existingCategories.rowCount > 0) {
            return res.status(400).json({
                message: `${name} category already exists`,
                category: existingCategories.rows[0]
            })
        }

        const result = await pool.query(`
            INSERT INTO categories(name, description)
            VALUES ($1, $2)
            RETURNING *
        `, [name, description]);

        return res.status(201).json({
            message: `${name} category created successfully`,
            category: result.rows[0]
        });
    }
    catch (error) {
        console.log("error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Id is required to fetch the category"
            })
        }

        const result = await pool.query(`
            SELECT * FROM categories
            WHERE id = $1
        `, [id]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                message: "Category found",
                category: result.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "category not found"
            })
        }
    }
    catch (error) {
        console.log("error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM categories
        `);

        return res.status(200).json({
            message: "category list",
            cagegories: result.rows
        })
    }
    catch (error) {
        console.log("error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Id is required to delete the category"
            })
        }

        const result = await pool.query(`
            DELETE FROM categories
            WHERE id = $1
            RETURNING * 
        `, [id]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                message: "category deleted successfully",
                category: result.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "Category not found",
            })
        }
    }
    catch (error) {
        console.log("error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;
        if (!name && !description) {
            return res.status(200).json({
                message: "name or description is required"
            })
        }

        const existingCategory = await pool.query(`
            SELECT * FROM categories
            WHERE id = $1
        `, [id]);

        if (existingCategory.rowCount === 0) {
            return res.status(400).json({
                message: "Category not found"
            })
        }

        const result = await pool.query(`
            UPDATE categories
            SET name = $1, description = $2
            WHERE id = $3
            RETURNING *
        `, [name, description, id]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                message: "category updated successfully",
                category: result.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "Category not found"
            })
        }
    }
    catch (err) {
        console.log("error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

module.exports = { createCategory, getCategoryById, getAllCategories, deleteCategoryById, updateCategoryById };