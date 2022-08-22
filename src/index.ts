import express from "express";
import { shadersRouter } from "./routes/shaders.router";
import { connectToDatabase } from "./services/database.service"
var cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 8888;

connectToDatabase()
    .then(() => {
        app.use("/shaders", shadersRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });