import { Module } from '@nestjs/common';
import { UsercurdService } from './usercurd.service';
import { UsercurdController } from './usercurd.controller';

import { User } from './entities/usercurd.entity';
import { Tags } from './entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tags])],
  controllers: [UsercurdController],
  providers: [UsercurdService],
})
export class UsercurdModule {}
