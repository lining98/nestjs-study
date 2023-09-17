import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DbtestService } from './dbtest.service';
import { CreateDbtestDto } from './dto/create-dbtest.dto';
import { UpdateDbtestDto } from './dto/update-dbtest.dto';

@Controller('dbtest')
export class DbtestController {
  constructor(private readonly dbtestService: DbtestService) {}

  @Post()
  create(@Body() createDbtestDto: CreateDbtestDto) {
    return this.dbtestService.create(createDbtestDto);
  }

  @Get()
  findAll() {
    return this.dbtestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dbtestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDbtestDto: UpdateDbtestDto) {
    return this.dbtestService.update(+id, updateDbtestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dbtestService.remove(+id);
  }
}
