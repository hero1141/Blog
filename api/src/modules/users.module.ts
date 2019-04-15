import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController, AuthController } from '../controllers';
import { User } from '../entities/user.entity';
import { UsersService } from '../services';
import { MailerModule } from '@nest-modules/mailer';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  MailerModule.forRoot(),ConfigModule.load()],
  controllers: [UsersController, AuthController],
  providers: [UsersService],
})
export class UsersModule {}