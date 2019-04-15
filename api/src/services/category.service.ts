import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * Find all users
   * @returns { Promise }
   */
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
    });
  }

  async create(categoryName: string, url: string): Promise<Category> {
    const category = new Category();
    category.name = categoryName;
    category.url = url;
    return await this.categoryRepository.save(category);
  }
}