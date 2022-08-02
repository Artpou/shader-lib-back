
import * as mongoDB from "mongodb";

const uri = "mongodb+srv://Artpou:VcBGMnaeiyPcuQ0s@shader-lib.sdct9.mongodb.net/?retryWrites=true&w=majority";

export const collections: { shaders?: mongoDB.Collection } = {}

export async function connectToDatabase () {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);   
  await client.connect();
      
  const db: mongoDB.Db = client.db("test");
  const shadersCollection: mongoDB.Collection = db.collection("shaders");

  collections.shaders = shadersCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${shadersCollection.collectionName}`);
}