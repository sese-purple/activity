import express from 'express';
import Todo from '../models/todo.js';
import { validateTodo } from '../middleware/validation.js';

const router = express.Router();

router.get('/home', async (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to software testing quality' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

   
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
                error: Object.values(error.error)[0].message
            });
        }
        res.status(500).json({ error: 'Failed to create todo' });

    }
});  

export default router;
       