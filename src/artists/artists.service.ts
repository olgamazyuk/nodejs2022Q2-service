import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validateId } from 'src/utils';
import { v4 } from 'uuid';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private static artists: Artist[] = [];

  create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist();
    newArtist.id = v4();
    newArtist.name = name;
    newArtist.grammy = grammy;

    ArtistsService.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return ArtistsService.artists;
  }

  findOne(id: string) {
    const artist = ArtistsService.artists.find((artist) => artist.id === id);
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index: number = ArtistsService.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = {
      ...updateArtistDto,
      id,
    };

    ArtistsService.artists[index] = updatedArtist;

    return updatedArtist;
  }

  remove(id: string) {
    const index: number = ArtistsService.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    ArtistsService.artists.splice(index, 1);
  }
}
