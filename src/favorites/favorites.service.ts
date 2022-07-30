import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.favourite.findMany();
  }

  async add(id: string) {
    return id;
  }

  async remove(id: string) {
    return id;
  }
}
