import { IsNotEmpty, IsString, Length,IsNumber } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 10, {
    message: '5到10个字符',
  })
  name: string;
  @IsNumber()
  age: number;
}
