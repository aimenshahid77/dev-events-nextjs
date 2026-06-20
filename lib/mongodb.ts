import mongoose from "mongoose";

// Retrieve the MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Interface representing the structure of our cached Mongoose connection.
 * Storing the connection and the promise separately allows us to queue
 * multiple dbConnect() calls while the initial connection is being established.
 */
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * In development mode, Next.js uses hot reloading, which triggers module recreation
 * on every file change. Declaring a global variable ensures that the Mongoose connection
 * is cached across hot reloads, avoiding exponential connection growth in development.
 */
declare global {
  // Use var for global scope declarations in TypeScript
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

// Initialize the global cache if it does not exist yet
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

// Retrieve the cached connection from the global object
const cached = global.mongoose;

/**
 * Connects to MongoDB using Mongoose, utilizing cached connections
 * to optimize resource usage in Serverless environments (like Next.js API Routes).
 */
async function dbConnect(): Promise<typeof mongoose> {
  // If a connection is already established, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no connection promise in progress, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Establishing the Mongoose connection and returning the mongoose instance
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise if connection fails so subsequent attempts can retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
