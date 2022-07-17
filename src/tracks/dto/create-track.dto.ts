import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Track } from '../track.entity';

export class CreateTrackDto extends OmitType(Track, ['id']) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;

  @IsNotEmpty()
  duration: number;
}
