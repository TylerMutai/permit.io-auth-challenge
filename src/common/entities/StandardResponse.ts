import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StandardResponse<T> {
  @IsNumber()
  status: number;

  @IsString()
  message?: string;

  @IsNotEmpty()
  payload?: T;
}
