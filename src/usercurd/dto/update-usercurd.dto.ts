import { PartialType } from '@nestjs/swagger';
import { CreateUsercurdDto } from './create-usercurd.dto';

export class UpdateUsercurdDto extends PartialType(CreateUsercurdDto) {}
