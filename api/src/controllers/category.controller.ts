import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { decode, sign } from 'jsonwebtoken';

import { UsersService } from '../services';
import { CreateUserDto } from '../dtos';
import { CategoryService } from '../services/';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('/')
  async findAll(@Req() req, @Res() res) {
    const categories = await this.categoryService.findAll();
    if (!categories)
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Not found categories',
      });
    return res.status(HttpStatus.OK).json(categories);
  }

  @Post('/')
  async create(@Req() req, @Res() res) {
    const { name, url } = req.body;
    const category = await this.categoryService.create(name, url);
    return res.status(HttpStatus.OK).json(category);
  }
}
