import { HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { classToPlain } from 'class-transformer';
import { CouldNotFindMovieError } from './exceptions/couldNotFindMovie.error';
import { TmdbService } from './tmdb.service';

describe('TmdbService', () => {
  let service: TmdbService;
  const TEST_MOVIE_ID = 550;
  const NON_EXISTENT_MOVIE = -1;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [TmdbService],
    }).compile();

    service = module.get<TmdbService>(TmdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should get a vaid response if movie exists', async () => {
    // return expect(service.getByMovieId(TEST_MOVIE_ID)).resolves.('id');
  })

  it('should throw an error if no movie exists',  () => {
    return expect(service.getByMovieId(NON_EXISTENT_MOVIE)).rejects.toThrow(CouldNotFindMovieError); // .catch(e => expect(e).toMatchObject(CouldNotFindMovieError))
  })
});
