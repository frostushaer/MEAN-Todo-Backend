const Todo = require('../models/todo');
const mongoose = require('mongoose');

// Create a new todo
const createTodo = async (req, res) => {
    const { title } = req.body;
    const uid = req.user.uid;
    const completed = false;

    // console.log(req.user);
    const newTodo = new Todo({
        title: title,
        uid: uid,
        completed: completed
    });
    await newTodo.save()
        .then(() => {
            res.status(201).json({ message: 'Todo created successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create todo' });
        });
};

// Toggle the completion status of a todo
const toggleComplete = async (req, res) => {
    const { id } = req.params;
    const uid = req.user.uid;
    try {
        const todo = await Todo.findOne({ _id: id, uid: uid });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json({ message: 'Todo completion status toggled successfully' });
    } catch (error) {
        console.error(`Error toggling todo completion status: ${error.message}`);
        res.status(500).json({ error: 'Failed to toggle todo completion status' });
    }
};

// Edit a todo
const editTodo = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const uid = req.user.uid;
    try {
        const todo = await Todo.findOneAndUpdate({id: id, uid: uid}, {title: title}, {new: true});
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.title = title;
        await todo.save();
        res.status(200).json({ message: 'Todo edited successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit todo' });
    }
};

// Get all todos
const getTodos = async (req, res) => {
    const uid = req.user.uid;
    try {
        const todos = await Todo.find({ uid: uid});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get todos' });
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const uid = req.user.uid;
    try {
        const todo = await Todo.findOneAndDelete({ _id: id, uid: uid });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};

module.exports = {
    createTodo,
    toggleComplete,
    editTodo,
    getTodos,
    deleteTodo
};