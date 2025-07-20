import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Todo text is required'],
        trim: true,
        maxlength: [200, 'Todo text cannot exceed 200 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;