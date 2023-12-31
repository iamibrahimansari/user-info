require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const userInfoRoutes = require('./routes/route.user');

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
// 
// middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', method: ['POST', 'GET', 'PATCH', 'DELETE'], headers: {'Content-Type': 'application/json'}}));

// routes
app.use('/api/user-info', userInfoRoutes);

const dbConnected = async () =>{
    try{
        await mongoose.connect(MONGO_URL)
        app.listen(PORT, () => console.log('Database connected & Server started on port:', PORT));
    }catch(error){
        console.log('DB connection error:', error.message);
    }
}

dbConnected();