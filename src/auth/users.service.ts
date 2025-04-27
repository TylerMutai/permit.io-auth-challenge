import { Injectable } from '@nestjs/common';

interface User {
  userId: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { userId: 'admin', password: '2025DEVChallenge' },
    { userId: 'newuser', password: '2025DEVChallenge' },
  ];

  validateUser(userId: string, password: string): User | null {
    const user = this.users.find(
      (u) => u.userId === userId && u.password === password,
    );
    return user || null;
  }
}