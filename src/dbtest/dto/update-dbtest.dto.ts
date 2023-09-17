import { PartialType } from '@nestjs/swagger';
import { CreateDbtestDto } from './create-dbtest.dto';

export class UpdateDbtestDto extends PartialType(CreateDbtestDto) {}
