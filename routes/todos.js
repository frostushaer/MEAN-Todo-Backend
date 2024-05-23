const express = require('express');
var { createTodo, getTodos, editTodo, toggleComplete, deleteTodo } = require('../controllers/todoController.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', auth, createTodo);
router.get('/getAll', auth, getTodos);
router.put('/toggle/:id', auth, toggleComplete);
router.put('/edit/:id', auth, editTodo);
router.delete('/delete/:id', auth, deleteTodo);

module.exports = router;