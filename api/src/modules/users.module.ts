import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController, AuthController } from '../controllers';
import { User } from '../entities/user.entity';
import { UsersService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AuthController],
  providers: [UsersService],
})
export class UsersModule {}