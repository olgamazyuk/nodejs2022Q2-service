import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './abum.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { validateId } from 'src/utils';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private static albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = { id: uuidv4(), ...createAlbumDto };
    AlbumsService.albums.push(newAlbum);

    return newAlbum;
  }

  findAll() {
    return AlbumsService.albums;
  }

  findOne(id: string) {
    const album = AlbumsService.albums.find((album) => album.id === id);
    if (!validateId(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index: number = AlbumsService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = {
      ...updateAlbumDto,
      id,
    };

    AlbumsService.albums[index] = updatedAlbum;

    return updatedAlbum;
  }

  remove(id: string) {
    const index: number = AlbumsService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    AlbumsService.albums.splice(index, 1);
  }
}
