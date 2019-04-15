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
  import { CommentService } from '../services/';

  @Controller('comments')
  export class CommentController {
    constructor(private readonly commentService: CommentService, private readonly usersService: UsersService) { }
  
    @Get('/')
    async findAll(@Req() req, @Res() res) {
      let articles = [];
      if (req.query.category) {
        articles = await this.commentService.findAll({category: req.query.category});
      } else {
        if (req.query.query) {
          articles = await this.commentService.search(req.query.query);  
        } else {
          articles = await this.commentService.findAll({});
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
      const article = await this.commentService.find(id);
      if (!article)
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Article Not found ',
        });
      return res.status(HttpStatus.OK).json(article);
    }
  
    @Post('/')
    async create(@Req() req, @Res() res) {
      if(req.body.url) {
        const user = await this.usersService.find(req.body.url);
        req.body.url = user.avatar;
        req.body.signature = `${user.firstName} ${user.lastName}`;
      }

      const comment = await this.commentService.create(req.body);
      console.log(comment);
      const articleWithRelations = await this.commentService.find(comment.id);
      return res.status(HttpStatus.OK).json(articleWithRelations);
    }
  }
  