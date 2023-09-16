import { Module, Global, DynamicModule } from '@nestjs/common';

interface Options {
  path: string;
}

@Global()
@Module({
  //   providers: [
  //     {
  //       provide: 'Config',
  //       useValue: { baseUrl: '/api' },
  //     },
  //   ],
  //   exports: [
  //     {
  //       provide: 'Config',
  //       useValue: { baseUrl: '/api' },
  //     },
  //   ],
})
export class ConfigModule {
  // 通过静态 传参
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
    };
  }
}
