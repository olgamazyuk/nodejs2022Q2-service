import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateId } from 'src/utils';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favourite = await this.prisma.favourite.findMany({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    const favouritesCollection = {
      artists: favourite[0].artists ?? [],
      albums: favourite[0].albums ?? [],
      tracks: favourite[0].tracks ?? [],
    };

    return favouritesCollection;
  }

  async addTrackToFav(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }

    const track = await this.prisma.track.findUnique({ where: { id } });

    if (track) {
      const favs = await this.prisma.favourite.findMany();
      await this.prisma.track.update({
        where: { id },
        data: { favouriteId: favs[0].id },
      });
    } else {
      throw new UnprocessableEntityException('Track does not exist');
    }
  }

  async removeTrackFromFav(id: string) {
    try {
      return this.prisma.track.update({
        where: { id },
        data: { favouriteId: { set: null } },
      });
    } catch (err) {
      throw new NotFoundException('Track not found');
    }
  }

  async addAlbumToFav(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }

    const album = await this.prisma.album.findUnique({ where: { id } });
    if (album) {
      const favs = await this.prisma.favourite.findMany();
      await this.prisma.album.update({
        where: { id },
        data: { favouriteId: favs[0].id },
      });
    } else {
      throw new UnprocessableEntityException('Album does not exist');
    }
  }

  async removeAlbumFromFav(id: string) {
    try {
      return this.prisma.album.update({
        where: { id },
        data: { favouriteId: { set: null } },
      });
    } catch (err) {
      throw new NotFoundException('Album not found');
    }
  }

  async addArtistToFav(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (artist) {
      const favs = await this.prisma.favourite.findMany();
      await this.prisma.artist.update({
        where: { id },
        data: { favouriteId: favs[0].id },
      });
    } else {
      throw new UnprocessableEntityException('Artist does not exist');
    }
  }

  async removeArtistFromFav(id: string) {
    return this.prisma.artist.update({
      where: { id },
      data: { favouriteId: { set: null } },
    });
  }
}
