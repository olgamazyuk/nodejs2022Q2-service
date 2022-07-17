import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private static favourites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    return FavoritesService.favourites;
  }

  add(id: string) {
    return id;
  }

  remove(id: string) {
    return id;
  }
}
