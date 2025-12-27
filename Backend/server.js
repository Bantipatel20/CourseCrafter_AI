import express from 'express';
import connectdb from './config/connection.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


connectdb();

app.listen(5000, () => {
    console.log('server started on port number 5000');
});
