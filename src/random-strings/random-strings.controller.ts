import { Controller, Get, Param, Patch } from '@nestjs/common';
import { RandomStringsService } from './random-strings.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('random-strings')
@ApiTags('Strings API')
export class RandomStringsController {
  constructor(private readonly randomStringsService: RandomStringsService) {}

  @ApiOperation({
    summary: 'Find document by name',
    description: 'Find by name',
  })
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
