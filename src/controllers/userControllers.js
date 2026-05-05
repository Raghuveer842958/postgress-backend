const pool = require('../config/db');

const signup3 = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required'
            })
        }

        const existingUser = false;
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const result = await pool.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email
        `, [name, email, password]);

        console.log("created user is :", result.rows[0]);

        return res.status(201).json({
            message: "User registered successfully!!",
            userInfo: result.rows[0],
            result: result
        })
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await pool.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING id, name, email
        `, [userId]);

        if (deletedUser.rowCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await pool.query(`
            SELECT * FROM users
            WHERE id = $1
        `, [userId]);

        if (user.rowCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            user: user.rows[0],
            result: user
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
}

const getAllUsers = async (req, res) => {
    try{
        const result = await pool.query(`
            SELECT * FROM users;
        `)

        return res.status(200).json({
            message: "all user fetched successfully",
            users: result.rows
        });
    } catch(err) {
        console.log("Error in fetching all users :", err);
        return res.status(500).json({
            message: "Internal server Error",
            error: err.message
        })
    }
}

const signup = async (req, res) => {
    try{
        const {name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            })
        }

        const existingUser = await pool.query(`
            SELECT * FROM users
            WHERE email = $1
        `, [email]);

        if(existingUser.rowCount > 0) {
            return res.status(400).json({
                message: "User alredy exist",
                user: existingUser.rows[0]
            })
        }

        const result = await pool.query(`
            INSERT INTO users(name, email, password)
            VALUES ($1, $2, $3)
        `, [name, email, password])

        return res.status(201).json({
            message: "User created successfully",
            user: result.rows[0],
            result: result
        })
    } catch (err) {
        console.log("Error in signup ->", err);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
}

module.exports = { signup, deleteUser, getUserById, getAllUsers };