import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { validateId } from 'src/utils';
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
    const album = this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return await album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index: number = AlbumsService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = {
      ...updateAlbumDto,
      id,
    };

    AlbumsService.albums[index] = updatedAlbum;

    return updatedAlbum;
  }

  remove(id: string) {
    const index: number = AlbumsService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    AlbumsService.albums.splice(index, 1);
  }
}
