import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsercurdService } from './usercurd.service';
import { CreateUsercurdDto } from './dto/create-usercurd.dto';
import { UpdateUsercurdDto } from './dto/update-usercurd.dto';

@Controller('usercurd')
export class UsercurdController {
  constructor(private readonly usercurdService: UsercurdService) {}

  @Post('/add/tags')
  addTags(@Body() params: { tags: string[]; userId: number }) {
    return this.usercurdService.addTags(params);
  }

  @Post()
  create(@Body() createUsercurdDto: CreateUsercurdDto) {
    return this.usercurdService.create(createUsercurdDto);
  }

  @Get()
  findAll(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    return this.usercurdService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usercurdService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsercurdDto: UpdateUsercurdDto,
  ) {
    return this.usercurdService.update(+id, updateUsercurdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usercurdService.remove(+id);
  }
}
