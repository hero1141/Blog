import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Article } from '../entities/article.entity';
import { CommentService } from 'services/comment.service';
import { CommentController } from 'controllers/comment.controller';
import { UsersService } from 'services';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), TypeOrmModule.forFeature([Article]), TypeOrmModule.forFeature([User])],
  controllers: [CommentController],
  providers: [CommentService, UsersService ],
})
export class CommentModule {}