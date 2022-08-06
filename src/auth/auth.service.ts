import {
  ForbiddenException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const hash = await bcrypt.hash(dto.password, process.env.CRYPT_SALT);
    const time = Date.now();
    try {
      const isExist = await this.prisma.user.findMany({
        where: {
          login: dto.login,
        },
      });

      if (isExist.length > 0) {
        return 'User with login ' + dto.login + ' already exist';
      }

      const user = await this.prisma.user.create({
        data: {
          login: dto.login,
          password: hash,
          createdAt: time,
          updatedAt: time,
        },
      });

      return this.signToken(user.id, user.login);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const { login, password } = dto;
    const users = await this.prisma.user.findMany();
    const user = users.find((user) => user.login === login);

    if (!user || !login || !password)
      throw new BadRequestException('Credentials incorrect');

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.login);
  }

  async signToken(
    userId: string,
    login: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      login,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    return {
      access_token: token,
    };
  }
}
