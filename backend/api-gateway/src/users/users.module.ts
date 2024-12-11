import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [HttpModule],
})
export class UsersModule {}
