import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './entities/UserModel';
import { SingleUserRequestDto } from './dto/single-user-request.dto';
import { SingleUserResponseDto } from './dto/single-user-response.dto';

@Injectable()
export class UsersService {
  private readonly users: UserModel[] = [
    {
      id: 'admin',
      email: 'admin@test.com',

      // Intentionally saved as a plain text (instead of a hashed version of the string) just for the purposes of the
      // demo.
      password: '2025DEVChallenge',
      name: 'Admin',
    },
    {
      id: 'newuser',

      // Intentionally saved as a plain text (instead of a hashed version of the string) just for the purposes of the
      // demo.
      password: '2025DEVChallenge',
      name: 'New User',
      email: 'newuser@test.com',
    },
  ];

  findOne({ id, email }: SingleUserRequestDto): SingleUserResponseDto {
    const user = this.users.find((u) => u.id === id || u.email === email);
    if (user) {
      return {
        message: 'Success',
        status: 200,
        payload: user,
      };
    }
    throw new NotFoundException(`user (${id || ''}${email || ''}) Not found.`);
  }
}
