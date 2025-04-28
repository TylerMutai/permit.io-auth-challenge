import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StandardResponse<T = any> {
  @IsNumber()
  status: number;

  @IsString()
  message?: string;

  @IsNotEmpty()
  payload?: T;
}
