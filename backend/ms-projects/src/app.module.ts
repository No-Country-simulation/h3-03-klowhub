import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProjectsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'db',
//       port: 5432,
//       username: 'root',
//       password: 'root',
//       database: 'klowhub',
//       autoLoadEntities: true,
//       entities: [Application, Project],
//       logging: true,
//       synchronize: true,
//     }),
//     ProjectsModule
//   ],

// })
// export class AppModule {}
