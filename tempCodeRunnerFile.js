import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.route.js'; // Corrected typo from 'athRouter' to 'authRouter'
import adminRouter from './routes/admin.router.js';
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => console.log('connected to mongodb')).catch((error) => console.log(error));

const app = express();
app.listen(3000, () => {
    console.log('server running on port 3000');
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('api/uploads'));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter); // Corrected typo from 'athRouter' to 'authRouter'
app.use('/api/admin', adminRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode
    });
});