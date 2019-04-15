import { Injectable, Inject } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  /**
   * Find all users
   * @returns { Promise }
   */
  async findAll(params): Promise<Article[]> {
    return await this.articleRepository.find({
      where: params,
      relations: ['category', 'user'],
      order: {
        id: "DESC"
      }
    });
  }

  async search(params): Promise<Article[]> {
    return await this.articleRepository.createQueryBuilder("article")
      .where("article.title like :query", {query: `%${params}%`})
      .leftJoinAndSelect("article.user", "user")
      .leftJoinAndSelect("article.category", "category")
      .getMany();
  }

  async find(id: number): Promise<Comment> {
    return await this.commentRepository.findOne(id, {
      relations: ['article']
    });
  }

  async create(commentData: Comment): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.signature = commentData.signature;
    comment.article = commentData.article;
    comment.url = commentData.url;
    return await this.commentRepository.save(comment);
  }
}