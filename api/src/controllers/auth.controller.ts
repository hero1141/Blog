import {
  Controller,
  Post,
  Req,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { decode, sign } from 'jsonwebtoken';

import { UsersService } from '../services';
import { CreateUserDto } from '../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/login')
  async signIn(@Req() req, @Res() res) {
    const { email, password } = req.body;
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await this.usersService.checkPasswordValidity(email, password)))
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Something is wrong with your email or password',
      });
    return res.status(HttpStatus.OK).json({
      token: UsersService.createToken(
        user.id,
      ),
      email,
      id: user.id
    });
  }

  @Post('/register')
  async register(
      @Req() req,
      @Res() res,
      @Body() createUserDto: CreateUserDto,
    ) {
    try {
      await this.usersService.create(req.body);
      return res.status(HttpStatus.CREATED).send();
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }

  @Post('/refresh')
  async refreshToken(@Req() req, @Res() res) {
    const secret = process.env.TOKEN_SECRET;
    const token = req.headers.authorization.replace('Bearer', '').trim();
    const decodedToken = decode(token);
    delete decodedToken.exp;
    decodedToken.updatedAt = new Date();
    return res.status(HttpStatus.OK).json({
      token: sign(decodedToken, secret, { expiresIn: 60 * 60 * 24 * 2 }),
    });
  }
}
