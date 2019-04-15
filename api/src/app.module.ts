import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from 'controllers/auth.controller';
import { UsersModule } from 'modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'modules/articleCategory.module';
import { ArticleModule } from 'modules/articles.module';
import { CommentModule } from 'modules/comments.module';

@Module({
  imports: [CommentModule, ArticleModule, UsersModule, CategoryModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
