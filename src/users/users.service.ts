import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validateId } from 'src/utils';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private static users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.id = v4();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.creartedAt = +Date.now();
    newUser.updatedAt = +Date.now();
    newUser.version = 1;

    UsersService.users.push(newUser);
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return UsersService.users;
  }

  findOne(id: string) {
    const user = UsersService.users.find((user) => user.id === id);
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (!user) {
      throw new NotFoundException('Track not found');
    }

    return user;
  }

  update(id: string) {
    const index: number = UsersService.users.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const updatedUser: Partial<User> = {};

    return updatedUser;
  }

  remove(id: string) {
    const index: number = UsersService.users.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    UsersService.users.splice(index, 1);
  }
}
