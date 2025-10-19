import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import AppError from '../shared/errors/appError';
import authRoute from '../presentation/routes/authRoutes';
import cors from 'cors'
const app = express()


//middlewares configs
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//protected routes
app.use('/api/auth', authRoute);

//AppError middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`${err}`)

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            data: err.data || null
        });
    }

    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
});



export default app