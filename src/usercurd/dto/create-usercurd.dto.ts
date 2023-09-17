import { ApiProperty } from "@nestjs/swagger";

export class CreateUsercurdDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    desc:string
}
