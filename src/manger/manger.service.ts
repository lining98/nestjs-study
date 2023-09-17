import { Injectable } from '@nestjs/common';
import { CreateMangerDto, transferMoneyDto } from './dto/create-manger.dto';
import { UpdateMangerDto } from './dto/update-manger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manger } from './entities/manger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MangerService {
  constructor(
    @InjectRepository(Manger) private readonly money: Repository<Manger>,
  ) {}

  create(createMangerDto: CreateMangerDto) {
    return this.money.save(createMangerDto);
  }

  async transferMoney(transferMoneyDto: transferMoneyDto) {
    //return this.manger.save(transferMoneyDto);
    try {
      //typeOrm 事务
      return await this.money.manager.transaction(async (manager) => {
        const from = await this.money.findOne({
          where: { id: transferMoneyDto.fromId },
        });
        const to = await this.money.findOne({
          where: { id: transferMoneyDto.toId },
        });
        console.log(from.money >= transferMoneyDto.money);
        if (from.money >= transferMoneyDto.money) {
          manager.save(Manger, {
            id: transferMoneyDto.fromId,
            money: from.money - transferMoneyDto.money,
          });
          manager.save(Manger, {
            id: transferMoneyDto.toId,
            money: to.money + transferMoneyDto.money,
          });
          return {
            message: '转账成功',
          };
        } else {
          return {
            message: '转账失败 余额不足',
          };
        }
      });
    } catch (e) {
      return {
        message: e,
      };
    }
  }

  findAll() {
    return `This action returns all manger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manger`;
  }

  update(id: number, updateMangerDto: UpdateMangerDto) {
    return `This action updates a #${id} manger`;
  }

  remove(id: number) {
    return `This action removes a #${id} manger`;
  }
}
