import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './entities/UserModel';
import { SingleUserRequestDto } from './dto/single-user-request.dto';
import {
  SingleUserResponseDto,
  SingleUserResponseWithPasswordDto,
} from './dto/single-user-response.dto';

@Injectable()
export class UsersService {
  private readonly users: UserModel[] = [
    {
      id: 'admin_user',
      email: 'adminuser@test.com',

      // Intentionally saved as a plain text (instead of a hashed version of the string) just for the purposes of the
      // demo.
      password: '2025DEVChallenge',
      name: 'Admin User',
      role: {
        role: 'admin',
        tenant: 'default',
      },
    },
    {
      id: 'editor_user',

      // Intentionally saved as a plain text (instead of a hashed version of the string) just for the purposes of the
      // demo.
      password: '2025DEVChallenge',
      name: 'Editor User',
      email: 'editoruser@test.com',
      role: {
        role: 'editor',
        tenant: 'default',
      },
    },
    {
      id: 'viewer_user',

      // Intentionally saved as a plain text (instead of a hashed version of the string) just for the purposes of the
      // demo.
      password: '2025DEVChallenge',
      name: 'Viewer User',
      email: 'vieweruser@test.com',
      role: {
        role: 'viewer',
        tenant: 'default',
      },
    },
  ];

  findOne({
    id,
    email,
  }: SingleUserRequestDto):
    | SingleUserResponseDto
    | SingleUserResponseWithPasswordDto {
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

  findAll() {
    return {
      status: 200,
      message: 'Success',
      payload: this.users,
    };
  }
}
