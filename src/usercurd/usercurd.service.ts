// import { Injectable } from '@nestjs/common';
// import { CreateUsercurdDto } from './dto/create-usercurd.dto';
// import { UpdateUsercurdDto } from './dto/update-usercurd.dto';

// import { Repository, Like } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/usercurd.entity';
// import { Tags } from './entities/tags.entity';

// @Injectable()
// export class UsercurdService {
//   constructor(
//     @InjectRepository(User) private readonly user: Repository<User>,
//     @InjectRepository(Tags) private readonly tags: Repository<Tags>,
//   ) {}

//   async addTags(params: { tags: string[]; userId: number }) {
//     const userInfo = await this.user.findOne({ where: { id: params.userId } });

//     const tagList: Tags[] = [];
//     for (let i = 0; i < params.tags.length; i++) {
//       const T = new Tags();
//       T.name = params.tags[i];
//       await this.tags.save(T);
//       tagList.push(T);
//     }
//     userInfo.tags = tagList;

//     console.log('userInfo', userInfo);

//     return true;
//   }

//   create(createUsercurdDto: CreateUsercurdDto) {
//     const data = new User();
//     data.name = createUsercurdDto.name;
//     data.desc = createUsercurdDto.desc;
//     return this.user.save(data);
//   }

//   async findAll(query: { keyWord: string; page: number; pageSize: number }) {
//     const data = await this.user.find({
//       relations: ['tags'], // 关联关系
//       where: {
//         name: Like(`%${query.keyWord}%`),
//       },
//       order: {
//         id: 'DESC', // 倒序
//       },
//       skip: (query.page - 1) * query.pageSize,
//       take: query.pageSize,
//     });
//     const total = await this.user.count({
//       where: {
//         name: Like(`%${query.keyWord}%`),
//       },
//     });
//     return {
//       data,
//       total,
//     };
//   }

//   findOne(id: number) {
//     return this.user.findOne(id)
//   }

//   update(id: number, updateUsercurdDto: UpdateUsercurdDto) {
//     return this.user.update(id, updateUsercurdDto);
//   }

//   remove(id: number) {
//     return this.user.delete(id);
//   }
// }

import { Injectable } from '@nestjs/common';
import { CreateUsercurdDto } from './dto/create-usercurd.dto';
import { UpdateUsercurdDto } from './dto/update-usercurd.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/usercurd.entity';
import { Tags } from './entities/tags.entity';
// import { example } from './entities/tags.entity';
@Injectable()
export class UsercurdService {
  constructor(
  @InjectRepository(User) private readonly user: Repository<User>,
  @InjectRepository(Tags) private readonly tag: Repository<Tags>
  ) { }

//通过前端传入的userId 查到当前id 的用户信息，然后拿到前端传入的tags [tag1,tag2,tag3]
// 进行遍历 给tag实例进行赋值 然后调用保存方法添加tag 添加完之后 通过 tagList 保存该tag类
// 最后把tagList 赋给 user类的tags属性 然后重新调用save 进行更新

  async addTags (params:{tags:string[],userId:number}) {
    const userInfo = await this.user.findOne({where:{id:params.userId}})
    const tagList:Tags[] = []
    for (let i = 0;i<params.tags.length;i++) {
       let T =  new Tags()
       T.tags = params.tags[i];
       await this.tag.save(T)
       tagList.push(T)
    }
    userInfo.tags = tagList;
    console.log(userInfo,1)
    return this.user.save(userInfo)
  }

  async create(createUserDto: CreateUsercurdDto) {
    const data = new User()
    // const ex = new example()
    data.name = createUserDto.name
    data.desc = createUserDto.desc
    // await this.example.save(ex)
    return this.user.save(data)
  }

  async findAll(query: { keyWord: string, page: number, pageSize: number }) {
    const data = await this.user.find({
      //查询的时候如果需要联合查询需要增加 relations
      relations:['tags'],
      where: {
        name: Like(`%${query.keyWord}%`)
      },
      order:{
        id:"DESC",
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize
    })
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`)
      },
    })
    return {
      data,
      total
    }
  }

  update(id: number, updateUserDto: UpdateUsercurdDto) {
    return this.user.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.user.delete(id)
  }
}
