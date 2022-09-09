import { IsNumber, IsString } from 'class-validator';

export class Album {
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  year: number;
  artistId: string | null;
}
