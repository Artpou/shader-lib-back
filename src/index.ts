import express from "express";
import { shadersRouter } from "./routes/shaders.router";
import { connectToDatabase } from "./services/database.service"

const app = express();
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