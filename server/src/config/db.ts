import mongoose from "mongoose";
import dotenv from 'dotenv'
import AppError from "../shared/errors/appError";
dotenv.config({ quiet: true })

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI!)
        console.log(`Database connected successfully✅`)

    } catch (error) {

        console.log(`DB connection failed`)
        throw new AppError('DB connection failed', 500)

    }
}

export default connectDB