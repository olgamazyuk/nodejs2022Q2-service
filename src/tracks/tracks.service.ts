import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = await this.prisma.track.create({
      data: {
        id: v4(),
        name: name,
        duration: duration,
        artistId: artistId,
        albumId: albumId,
      },
    });

    return newTrack;
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id: id },
        data: { ...updateTrackDto },
      });
    } catch (err) {
      throw new NotFoundException('Track not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.track.delete({
        where: { id: id },
      });
    } catch (err) {
      throw new NotFoundException('Track not found');
    }
  }
}
