import { ObjectId, WithId } from "mongodb";

export interface Shader {
    id?: ObjectId;
    name?: string;
    vertex?: string;
    fragment?: string;
}