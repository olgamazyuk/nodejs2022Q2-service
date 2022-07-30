import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create({ name, grammy }: CreateArtistDto) {
    const newArtist = await this.prisma.artist.create({
      data: {
        id: v4(),
        name: name,
        grammy: grammy,
      },
    });

    return newArtist;
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id: id },
        data: { ...updateArtistDto },
      });
    } catch (err) {
      throw new NotFoundException('Artist not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.artist.delete({
        where: { id: id },
      });
    } catch (err) {
      throw new NotFoundException('Artist not found');
    }
  }
}
