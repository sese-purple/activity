import express from 'express';
import connectDB from './database/database.js';
import dotenv from "dotenv";    
import todoRouters from './routes/routes.js';

dotenv.config();

console.log("Mongo URI:", process.env.MONGODB_URI);

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/todos', todoRouters);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

        