const pool = require("../config/db");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id, created_by } = req.body;
        if (!name || !description || !price || !stock || !category_id || !created_by) {
            return res.status(400).json({
                message: "All fields Are required"
            })
        }

        const existingCategory = await pool.query(`
            SELECT * FROM categories
            WHERE id = $1
        `, [category_id])

        if (existingCategory.rowCount === 0) {
            return res.status(400).json({
                message: "Category not found"
            })
        }

        const existingUser = await pool.query(`
            SELECT * FROM users
            WHERE id = $1
        `, [created_by]);

        if (existingUser.rowCount === 0) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const result = await pool.query(`
            INSERT INTO products (name, description, price, stock, category_id, created_by)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, description, price, stock, category_id, created_by])

        return res.status(201).json({
            message: "Product created successfully",
            product: result.rows[0]
        });
    } catch (err) {
        console.log("Error in creating product :", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Id is required to get the product details"
            })
        }

        const result = await pool.query(`
            SELECT * FROM products
            WHERE id = $1
        `, [id]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                message: "Products found",
                product: result.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "Product not found"
            })
        }
    } catch (err) {
        console.log("Error is :", err);
        return res.status(500).json({
            message: "Interanal server error",
            error: err.message
        })
    }
}

const getAllProductList = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM products
        `)

        return res.status(200).json({
            message: "Product List",
            productList: result.rows
        })
    } catch (err) {
        console.log("Error is :", err);
        return res.status(500).json({
            message: "Interanal server error",
            error: err.message
        })
    }
}

const getAllProductList_ByCreatedBy = async (req, res) => {
    try {
        const { adminId } = req.params;
        if (!adminId) {
            return res.status(400).json({
                message: "Product id is required"
            })
        }

        const isAdmin = await pool.query(`
            SELECT * FROM users
            WHERE id = $1
        `, [adminId]);

        if (isAdmin.rowCount === 0) {
            return res.status(200).json({
                message: "admin not found"
            })
        }

        const result = await pool.query(`
            SELECT * FROM products
            WHERE created_by = $1
        `, [adminId])

        return res.status(200).json({
            message: "admin all products are..",
            productList: result.rows
        });
    } catch (err) {
        console.log("Error is :", err);
        return res.status(500).json({
            message: "Interanal server error",
            error: err.message
        })
    }
}

const getProductById_ByCreatedBy = async (req, res) => {
    try {
        const { id, adminId } = req.params;

        if (!id || !adminId) {
            return res.status(400).json({
                message: "Product id and adminId are required"
            });
        }

        const result = await pool.query(`
            SELECT * FROM products
            WHERE id = $1 AND created_by = $2
        `, [id, adminId]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Product not found for this admin"
            });
        }

        return res.status(200).json({
            message: "Product found",
            product: result.rows[0]
        });

    } catch (err) {
        console.log("Error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category_id } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Product id is required"
            });
        }

        // check product exists
        const existingProduct = await pool.query(`
            SELECT * FROM products WHERE id = $1
        `, [id]);

        if (existingProduct.rowCount === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // optional: check category exists if updating
        if (category_id) {
            const category = await pool.query(`
                SELECT * FROM categories WHERE id = $1
            `, [category_id]);

            if (category.rowCount === 0) {
                return res.status(400).json({
                    message: "Invalid category"
                });
            }
        }

        const result = await pool.query(`
            UPDATE products
            SET 
                name = COALESCE($1, name),
                description = COALESCE($2, description),
                price = COALESCE($3, price),
                stock = COALESCE($4, stock),
                category_id = COALESCE($5, category_id),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `, [name, description, price, stock, category_id, id]);

        return res.status(200).json({
            message: "Product updated successfully",
            product: result.rows[0]
        });

    } catch (err) {
        console.log("Error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Product id is required"
            });
        }

        const result = await pool.query(`
            DELETE FROM products
            WHERE id = $1
            RETURNING *
        `, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            deletedProduct: result.rows[0]
        });

    } catch (err) {
        console.log("Error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports = {
    createProduct,
    getProductById,
    getAllProductList,
    getAllProductList_ByCreatedBy,
    getProductById_ByCreatedBy,
    updateProductById,
    deleteProductById
};