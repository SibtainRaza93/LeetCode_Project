import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
connectDB().then(async () => {
    app.listen(PORT, () => {
        console.log(`Server listening at PORT: ${PORT}`);
    })
}).catch((error)=>{
    console.log("Error Occurred");  
})

