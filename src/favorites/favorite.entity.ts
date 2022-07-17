import { IsArray } from 'class-validator';

export class Favorite {
  @IsArray()
  artists: string[];

  @IsArray()
  albums: string[];

  @IsArray()
  tracks: string[];
}
