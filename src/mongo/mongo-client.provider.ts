import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://root:root@localhost:27017';

export const MONGO_CLIENT = Symbol('MONGO_CLIENT');

export const mongoClientProvider = {
  provide: MONGO_CLIENT,
  useFactory: async () => {
    return new MongoClient(MONGO_URI).connect();
  },
};
