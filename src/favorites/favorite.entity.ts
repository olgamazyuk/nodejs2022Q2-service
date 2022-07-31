import { IsArray } from 'class-validator';

export class Favourite {
  @IsArray()
  artists: string[];

  @IsArray()
  albums: string[];

  @IsArray()
  tracks: string[];
}
