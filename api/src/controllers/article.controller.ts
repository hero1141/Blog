import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    HttpStatus,
    Body,
    Delete,
  } from '@nestjs/common';
  import { decode, sign } from 'jsonwebtoken';
  
  import { UsersService } from '../services';
  import { ArticleService } from '../services/';

  import Captcha from '../helpers/captcha';
  
  @Controller('articles')
  export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }
  
    @Get('/')
    async findAll(@Req() req, @Res() res) {
      let articles = [];
      if (req.query.category) {
        articles = await this.articleService.findAll({category: req.query.category});
      } else {
        if (req.query.query) {
          articles = await this.articleService.search(req.query.query);  
        } else if (req.query.user) {
          articles = await this.articleService.findByUser(req.query.user);
        } else {
          articles = await this.articleService.findAll({});
        }
      }
      if (!articles)
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Not found articles',
        });
      return res.status(HttpStatus.OK).json(articles);
    }

    @Get(':id')
    async findOne(@Req() req, @Res() res) {
      const { id } = req.params;
      const article = await this.articleService.find(id);
      const captcha = await Captcha.createCaptcha();
      if (!article)
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Article Not found ',
        });
      return res.status(HttpStatus.OK).json({...article, base64: Buffer.from((captcha as any).buffer).toString('base64'), 'decoded': (captcha as any).text });
    }
  
    @Post('/')
    async create(@Req() req, @Res() res) {
      const article = await this.articleService.create(req.body);
      const articleWithRelations = await this.articleService.find(article.id); 
      return res.status(HttpStatus.OK).json(articleWithRelations);
    }

    @Delete(':id')
    async destroy(@Req() req, @Res() res) {
      const { id } = req.params;
      const article = await this.articleService.destroy(id);
      return res.status(HttpStatus.NO_CONTENT).json();

    }
  }
  