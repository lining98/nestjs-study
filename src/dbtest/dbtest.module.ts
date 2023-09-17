import { Module } from '@nestjs/common';
import { DbtestService } from './dbtest.service';
import { DbtestController } from './dbtest.controller';

import { Dbtest } from './entities/dbtest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Dbtest])],
  controllers: [DbtestController],
  providers: [DbtestService]
})
export class DbtestModule {}
