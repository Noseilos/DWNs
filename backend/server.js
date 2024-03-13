import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import userUploadRoutes from './routes/userUploadRoutes.js'
import reportRoutes from './routes/reportRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

import reportUploadRoutes from './routes/reportUploadRoutes.js'
import locationUploadRoutes from './routes/locationUploadRoutes.js'

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());


const __dirname = path.resolve(); // Set dir name to current directory

app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/locations', locationRoutes);

app.use('/api/uploads/user', userUploadRoutes);
app.use('/api/uploads/locations', locationUploadRoutes);
app.use('/api/uploads/reports', reportUploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production'  ) {
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    // any route that is not api will be redirected to index.html
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );

} else {
    app.get('/', (req, res) => {
        res.send('API is running ...');
    });
}

app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
}));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));