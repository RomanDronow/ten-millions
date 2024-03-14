import { Controller, Get, Param, Patch } from '@nestjs/common';
import { RandomStringsService } from './random-strings.service';

@Controller('random-strings')
export class RandomStringsController {
  constructor(private readonly randomStringsService: RandomStringsService) {}

  @Get('find-by-name/:name')
  async findByName(@Param('name') name: string) {
    return this.randomStringsService.findByName(name);
  }

  @Patch('create-index')
  async createIndex() {
    return this.randomStringsService.createIndex();
  }

  @Patch('remove-index')
  async removeIndex() {
    return this.randomStringsService.removeIndex();
  }
}
