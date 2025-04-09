import express from 'express'

// Best practice
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';


import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js"

dotenv.config();
const app = express();
// const PORT = process.env.PORT || 3000; can be like this
const PORT  = process.env.PORT; 

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet()); // Security middleware that helps protect app by setting various HTTP headers
app.use(morgan("dev")); // log requests

async function initializeDB(){
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log("Database Initialize")
    } catch(err){
        console.log("Error initializing Database", err)
    }
}
app.use("/api/products", productRoutes)

initializeDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server running in port" + PORT)
    })
})
