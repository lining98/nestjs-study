import { Injectable } from '@nestjs/common';
import { CreateDbtestDto } from './dto/create-dbtest.dto';
import { UpdateDbtestDto } from './dto/update-dbtest.dto';

@Injectable()
export class DbtestService {
  create(createDbtestDto: CreateDbtestDto) {
    return 'This action adds a new dbtest';
  }

  findAll() {
    return `This action returns all dbtest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dbtest`;
  }

  update(id: number, updateDbtestDto: UpdateDbtestDto) {
    return `This action updates a #${id} dbtest`;
  }

  remove(id: number) {
    return `This action removes a #${id} dbtest`;
  }
}
