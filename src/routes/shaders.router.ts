import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Shader } from "../models/shader";
import { collections } from "../services/database.service";

export const shadersRouter = express.Router();


shadersRouter.use(express.json());

shadersRouter.get("/", async (_req: Request, res: Response) => {
    const shaderCollection = await collections.shaders;

    try {
        const shader = shaderCollection ? (await shaderCollection.find({}).project({name: 1}).toArray()) as Shader[] : {};
        res.status(200).send(shader);
    } catch (error) {
        res.status(500).send(error);
    }
});

shadersRouter.get("/:id", async (req: Request, res: Response) => {
    const shaderCollection = await collections.shaders;
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const shader = shaderCollection ? (await shaderCollection.findOne(query)) as Shader : {};

        if (shader) {
            res.status(200).send(shader);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

shadersRouter.post("/", async (req: Request, res: Response) => {
    const shaderCollection = await collections.shaders;

    try {
        console.log(req.body);

        const newShader = {
            name: req.body.name,
            vertex: req.body.vertex,
            fragment: req.body.fragment,
            date: new Date()
        } as Shader;

        const result = shaderCollection ? await shaderCollection.insertOne(newShader) : undefined;

        result
            ? res.status(201).send(`Successfully created a new shader with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new shader.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

shadersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const shaderCollection = await collections.shaders;

    try {
        const query = { _id: new ObjectId(id) };
        const result = shaderCollection ? await shaderCollection.deleteOne(query) : undefined;

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});