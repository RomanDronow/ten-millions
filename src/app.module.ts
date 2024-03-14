import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomStringsModule } from './random-strings/random-strings.module';

@Module({
  imports: [RandomStringsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
