import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        id: uuidv4(),
        ...createAlbumDto,
      },
    });
    return album;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prisma.album.update({
        where: { id: id },
        data: { ...updateAlbumDto },
      });
    } catch (err) {
      throw new NotFoundException('Album not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.album.delete({
        where: { id: id },
      });
    } catch (err) {
      throw new NotFoundException('Album not found');
    }
  }
}
