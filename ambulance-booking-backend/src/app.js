import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.route.js"
import ambulanceRouter from "./routes/ambulanceBooking.route.js"

app.use("/api/users", userRouter)
app.use("/api/ambulance", ambulanceRouter)

export { app }