
import mongoose from "mongoose";
// 0:: Validation
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// 1::  Type Definition for Mongoose in Global Scope:
let globalWithMongoose = global as typeof globalThis & {
    mongoose: any;
};

// 2 :: Caching Mongoose Instance.
let cached = globalWithMongoose.mongoose;
if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

// 3:: Database Connection Function:
export default async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}