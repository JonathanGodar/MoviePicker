import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { WatchGroupModule } from './watch-group/watch-group.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MovieModule, 
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      context: ({req}) => ({headers: req.headers})
    }),
    TypeOrmModule.forRoot(
      {
        monitorCommands: true
      }
    ),
    TmdbModule,
    AuthModule,
    UserModule,
    WatchGroupModule,
  ],
})
export class AppModule {}
