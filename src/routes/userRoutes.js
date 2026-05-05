const express = require("express");
const { signup, deleteUser, getUserById, getAllUsers } = require("../controllers/userControllers");
const router = express.Router();

router.post('/signup', signup);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.get('/', getAllUsers);


module.exports = router;