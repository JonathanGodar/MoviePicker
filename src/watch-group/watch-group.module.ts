import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';
import { WatchGroupToMovie } from './entities/watch-group-to-movie.entity';
import { WatchGroupToUser } from './entities/watch-group-to-user.entity';
import { WatchGroup } from './entities/watch-group.entity';
import { WatchGroupResolver } from './watch-group.resolver';
import { WatchGroupService } from './watch-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([WatchGroup, WatchGroupToMovie, WatchGroupToUser]), UserModule, MovieModule],
  providers: [WatchGroupService, WatchGroupResolver]
})
export class WatchGroupModule { }
