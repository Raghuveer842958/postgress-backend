const pool = require('../config/db');

const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({
                message: "All field required"
            })
        }

        const existingUser = await pool.query(`
            SELECT * FROM users
            WHERE email = $1
        `,[email]);

        if(existingUser.rowCount > 0){
            return res.status(400).json({
                message: "User already exits",
                user: existingUser.rows[0]
            })
        }

        const result = await pool.query(`
            INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
            RETURNING *
        `, [name, email, password]);

        return res.status(201).json({
            message: "user signedup successfully",
            user: result.rows[0]
        })
    } catch (err) {
        console.log("error in user signup :", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields required"
            })
        }

        const existingUser = await pool.query(`
            SELECT * FROM users
            WHERE email = $1 AND password = $2
        `,[email, password]);

        if(existingUser.rowCount > 0){
            return res.status(200).json({
                message: "User login successfully........",
                user: existingUser.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "Invalid email or password......",
            })
        }

        // below code will not run

        const isPasswordMatch = existingUser.rows[0].password === password ? true : false;

        if(isPasswordMatch){
            return res.status(200).json({
                message: "User login successfully", 
                user: existingUser.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "Invalid password",
            })
        }
    } catch(err){
        console.log("error in user login :", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id){
            return res.status(400).json({
                message: "Id is required to delete the user"
            });
        }

        const existingUser = await pool.query(`
            SELECT * FROM users
            WHERE id = $1
        `,[id]);

        if(existingUser.rowCount > 0){
            return res.status(200).json({
                message: "User found",
                user: existingUser.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "User not found"
            })
        }
    } catch (err) {
        console.log("error in fetcing user by id :", err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message: "Id is required to delete User"
            })
        }

        const checkAndDelete = await pool.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING *
        `,[id]);

        if(checkAndDelete.rows.length > 0){
            return res.status(200).json({
                message: "User deleted successfully",
                user: checkAndDelete.rows[0]
            })
        } else {
            return res.status(400).json({
                message: "User not found"
            })
        }

    } catch (err) {
        console.log("error in delete user ->", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query(`
            SELECT id, name, email FROM users;
        `)

        return res.status(200).json({
            message: "User list",
            users: users.rows
        });
    } catch (err) {
        console.log("error is :", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

module.exports = { signup, login, deleteUser, getUserById, getAllUsers };