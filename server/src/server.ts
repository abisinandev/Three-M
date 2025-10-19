import app from './config/app'
import dotenv from 'dotenv'
import connectDB from './config/db'
dotenv.config({ quiet: true })

//db connection
connectDB();

//port
const PORT = process.env.PORT || 9001

//listen server
app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`)
})