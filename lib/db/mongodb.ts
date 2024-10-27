// lib/db/mongodb.ts
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
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

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Export all utilities as named exports
export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const formatObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};

export const isValidObjectId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const SchemaTypes = mongoose.Schema.Types;

export const handleMongoError = (error: any) => {
  if (error.code === 11000) {
    return {
      status: 409,
      message: 'Duplicate entry found',
      error: error.keyValue,
    };
  }

  if (error.name === 'ValidationError') {
    return {
      status: 400,
      message: 'Validation Error',
      error: Object.values(error.errors).map((err: any) => err.message),
    };
  }

  return {
    status: 500,
    message: 'Internal Server Error',
    error: error.message,
  };
};