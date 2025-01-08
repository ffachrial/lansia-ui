import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_CONNECTION_STRING;
const options = {};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
