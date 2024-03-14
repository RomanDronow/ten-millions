import { Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT } from '../mongo/mongo-client.provider';
import { MongoClient } from 'mongodb';

@Injectable()
export class RandomStringsService {
  private readonly dbName = 'sample';
  private readonly collectionName = 'strings';
  private readonly indexName = 'name_1';

  constructor(
    @Inject(MONGO_CLIENT)
    private readonly mongoClient: MongoClient,
  ) {}

  async findByName(name: string) {
    const db = this.mongoClient.db(this.dbName);
    const collection = db.collection(this.collectionName);

    return collection.find({ name }).toArray();
  }

  async createIndex() {
    const db = this.mongoClient.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const indexExists = await collection.indexExists(this.indexName);

    if (indexExists) {
      return this.indexName;
    }

    return collection.createIndex({ name: 1 });
  }

  async removeIndex() {
    const db = this.mongoClient.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const indexExists = await collection.indexExists(this.indexName);

    if (!indexExists) {
      return this.indexName;
    }

    return collection.dropIndex('name_1');
  }
}
