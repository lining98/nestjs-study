# nestjs swagger接口文档

## 安装

```bash
npm install  @nestjs/swagger swagger-ui-express
```

## 在main.js注册

```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// ...
async function bootstrap() {
  // ...
  const options = new DocumentBuilder()
    .setTitle('标题11')
    .setDescription('描述')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
}
```

## Swagger 分组
在controller文件中引入依赖项
```ts
import {
  ApiBearerAuth,  // 请求头携带token信息
  ApiOperation,  // 接口描述
  ApiParam,    // 描述动态参数
  ApiQuery,    //
  ApiResponse, // 返回的自定义描述
  ApiTags,  // 分组名称
} from '@nestjs/swagger';

@Controller('guard')
@ApiTags('守卫接口')
@UseGuards(RoleGuard)
```

