import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { Asset } from './entities/asset.entity';
import { Promotion } from './entities/promotion.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([App, Asset, Promotion]),
    CloudinaryModule,
    HttpModule,
  ],
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
