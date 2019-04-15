import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { Article } from '../entities/Article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
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

  async destroy(id): Promise<any> {
    return await this.articleRepository.createQueryBuilder()
      .where("id = :id", {id})
      .delete()
      .execute();
  }

  async search(params): Promise<Article[]> {
    return await this.articleRepository.createQueryBuilder("article")
      .where("article.title like :query", {query: `%${params}%`})
      .leftJoinAndSelect("article.user", "user")
      .leftJoinAndSelect("article.category", "category")
      .getMany();
  }

  async find(id: number): Promise<Article> {
    return await this.articleRepository.createQueryBuilder("article")
      .where("article.id = :id", { id: id })
      .leftJoinAndSelect("article.category", "category")
      .leftJoinAndSelect("article.comments", "comment")
      .leftJoinAndSelect("article.user", "user")
      .orderBy("comment.id", "DESC")
      .getOne();
  }

  async findByUser(id: number): Promise<Article[]> {
    return await this.articleRepository.find({
      where: { user: id },
      relations: ['category', 'user'],
      order: {
        id: "DESC"
      }
    });
  }

  async create(articleData: Article): Promise<Article> {
    const article = new Article();
    article.title = articleData.title;
    article.content = articleData.content;
    article.category = articleData.category;
    article.imageUrl = articleData.imageUrl;
    article.user = articleData.user;
    return await this.articleRepository.save(article);
  }
}