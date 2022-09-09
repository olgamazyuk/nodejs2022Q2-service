import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validateId } from 'src/utils';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
  private static tracks: Track[] = [];

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track();
    newTrack.id = v4();
    newTrack.name = name;
    newTrack.duration = duration;
    newTrack.artistId = artistId;
    newTrack.albumId = albumId;

    TracksService.tracks.push(newTrack);

    return newTrack;
  }

  findAll() {
    return TracksService.tracks;
  }

  findOne(id: string) {
    const track = TracksService.tracks.find((track) => track.id === id);
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index: number = TracksService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = {
      ...updateTrackDto,
      id,
    };

    TracksService.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const index: number = TracksService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    TracksService.tracks.splice(index, 1);
  }
}
