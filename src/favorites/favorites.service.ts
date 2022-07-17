import { Injectable } from '@nestjs/common';

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
