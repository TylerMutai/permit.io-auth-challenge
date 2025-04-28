import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserModel {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: {
    role: string;
    tenant: string;
  };
}
