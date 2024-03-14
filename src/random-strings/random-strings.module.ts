import { Module } from '@nestjs/common';
import { RandomStringsService } from './random-strings.service';
import { MongoClientModule } from '../mongo/mongo-client.module';
import { RandomStringsController } from './random-strings.controller';

@Module({
  imports: [MongoClientModule],
  controllers: [RandomStringsController],
  providers: [RandomStringsService],
})
export class RandomStringsModule {}
