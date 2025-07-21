import express from 'express';
import Todo from '../models/todo.js';
import { validateTodo } from '../middleware/validation.js';

const router = express.Router();

// Welcome route (existing - unchanged)
router.get('/home', async (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to software testing quality' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Create Todo (existing - unchanged)
router.post('/todos', validateTodo, async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text,
        });

        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error){
        console.error("Error creating todo:", error);

        if(error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: Object.values(error.errors)[0].message
            });
        }
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Get All Todos (new)
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});


// Get active todos (incomplete)
router.get('/todos/active', async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch active todos"  // Fixed: Added missing quote
    });
  }
});

// Get completed todos
router.get('/todos/completed', async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch completed todos",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});








// Get Single Todo (new)
router.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
});

// Update Todo (new)
router.patch('/todos/:id', validateTodo, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete Todo (new)
router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});


    export default router;