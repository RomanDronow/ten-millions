import { Module } from '@nestjs/common';
import { mongoClientProvider } from './mongo-client.provider';

@Module({
  providers: [mongoClientProvider],
  exports: [mongoClientProvider],
})
export class MongoClientModule {}
