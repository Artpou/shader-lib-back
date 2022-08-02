import express, { Request, Response } from "express";
import { Shader } from "../models/shader";
import { collections } from "../services/database.service";

export const shadersRouter = express.Router();


shadersRouter.use(express.json());

shadersRouter.get("/", async (_req: Request, res: Response) => {
    const shaderCollection = await collections.shaders;

    try {
        const games = shaderCollection ? (await shaderCollection.find({}).toArray()) as Shader[] : {};
        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

shadersRouter.post("/", async (req: Request, res: Response) => {
    const shaderCollection = await collections.shaders;

    try {
        console.log(req.body);

        const newShader = {
            name: req.body.name,
            vertex: req.body.vertex,
            fragment: req.body.fragment  
        } as Shader;

        const result = shaderCollection ? await shaderCollection.insertOne(newShader) : undefined;

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});