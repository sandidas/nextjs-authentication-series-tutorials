import { MongoClient } from "mongodb"


if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri: string = process.env.MONGODB_URI
const options = {}

let client: MongoClient;
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongoClientPromise = global as typeof globalThis & {
        _mongoClientPromise: Promise<MongoClient>
    }

    if (!globalWithMongoClientPromise._mongoClientPromise) {
        client = new MongoClient(uri, options)
        globalWithMongoClientPromise._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongoClientPromise._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise