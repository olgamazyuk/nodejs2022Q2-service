import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const time = Date.now();
    createUserDto.createdAt = time;
    createUserDto.updatedAt = time;
    const created = await this.prisma.user.create({
      data: createUserDto,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = created;
    return rest;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      const time = Date.now();
      if (user.password == updateUserDto.oldPassword) {
        const result = await this.prisma.user.update({
          where: { id },
          data: {
            updatedAt: time,
            password: updateUserDto.newPassword,
            version: user.version + 1,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = result;
        return rest;
      } else {
        throw new ForbiddenException('Incorrect password');
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id: id },
      });
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }
}
