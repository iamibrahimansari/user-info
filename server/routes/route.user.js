const router = require('express').Router();

const {createUser, getUsers, getUser, updateUser, deleteUser} = require('../controllers/controller.user');

// POST
router.post('/', createUser);

// GET
router.get('/', getUsers);

// GET
router.get('/:id', getUser);

// PATCH
router.patch('/:id', updateUser);

// DELETE
router.delete('/:id', deleteUser);

module.exports = router;