import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Req,
  Delete,
  Res,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post('/message')
  async sendMessage(@Req() req, @Res() res) {
    await this.usersService.sendMessage(req.body);
    res.status(HttpStatus.OK).json();
  }
  

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async find(@Param() params) {
    return await this.usersService.find(params.id);
  }

  @Put(':id')
  async update(@Req() req, @Param() params) {
    return await this.usersService.update(params.id, req.body);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.usersService.delete(params.id);
  }

  @Post()
  async create(@Req() req, @Res() res) {
    const user = await this.usersService.create(req.body);
    res.status(HttpStatus.OK).json(user);
  }

}
