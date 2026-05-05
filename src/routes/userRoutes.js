const express = require("express");
const { signup, deleteUser, getUserById, getAllUsers, login } = require("../controllers/userControllers");
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.get('/', getAllUsers);


module.exports = router;