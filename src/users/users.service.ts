import { Injectable } from '@nestjs/common';
import { UserModel } from './entities/UserModel';
import { SingleUserRequest } from './dto/SingleUserRequest';
import { SingleUserResponse } from './dto/SingleUserResponse';

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

  getUser({ id }: SingleUserRequest): SingleUserResponse {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      return {
        message: 'Success',
        status: 200,
        payload: user,
      };
    }
    return {
      message: 'User not found',
      status: 404,
    };
  }
}
