import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Ensure credentials are allowed (cookies, headers)
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionSuccessStatus: 200
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.route.js"
import ambulanceRouter from "./routes/ambulanceBooking.route.js"

app.use("/api/users", userRouter)
app.use("/api/ambulance", ambulanceRouter)

export { app }