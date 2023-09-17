import { ExecutionContext, SetMetadata, createParamDecorator,applyDecorators } from '@nestjs/common';
import { Request } from 'express';

export const Role = (...args: string[]) => SetMetadata('role', args);


export const ReqUrl = createParamDecorator((data:string,ctx:ExecutionContext)=>{
    const req = ctx.switchToHttp().getRequest<Request>()
    /**
     * @Get()
        @Role('admin')
        findAll(@ReqUrl('123') url:string) {
            console.log('url========>',url);
            return this.guardService.findAll();
        }
     */
    console.log('data============>',data); // 123 指向@ReqUrl()里面传递的参数
    return req.url

    // return applyDecorators(Role,xxxx,xxx) // 把所有的装饰器组合起来
})