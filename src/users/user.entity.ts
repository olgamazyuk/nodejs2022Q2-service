import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  creartedAt: number;
  updatedAt: number;
}
