import { Injectable, Inject } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('MailerProvider') private readonly mailerProvider,
  ) {}

  /**
   * Generate hashed password
   * @param password - password to hash
   * @returns { string }
   */
  static saltHashPassword(password: string): string {
    const salt = process.env.TOKEN_SECRET;
    return createHmac('sha512', salt)
      .update(password)
      .digest('hex');
  }

  /**
   * Create JWT for specified user
   * @param userID - the user's ID for which the token is to be generated
   * @returns { string }
   */
  static createToken(userID: number): string {
    const secret = process.env.TOKEN_SECRET;
    return sign({ sub: userID }, secret, { expiresIn: 60 * 60 * 24 * 2 });
  }

  /**
   * Check if password from login form matches with password in database
   * @param email - user email from login request
   * @param password - user password from login request
   * @returns { boolean }
   */
  async checkPasswordValidity(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    const hashedPassword = UsersService.saltHashPassword(password);
    return user.password === hashedPassword;
  }

  /**
   * Find all users
   * @returns { Promise }
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
    });
  }

  /**
   * Find user by id
   * @param id - user id
   * @returns { Promise }
   */
  async find(id: number): Promise<User> {
    return await this.userRepository.findOne(id, {
    });
  }

  /**
   * Find user by email
   * @param email - user email
   * @returns { Promise }
   */
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  /**
   * Register new user
   * @param userData - object which contains user data
   * @returns { User }
   */
  async create(userData): Promise<User> {
    const user = new User();
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.password = UsersService.saltHashPassword(userData.password);
    return await this.userRepository.save(user);
  }

  /**
   * Update existing user
   * @param id - user ID
   * @param userData - object with contains user data
   * @returns { User }
   */
  async update(id, userData): Promise<User> {
    const user = await this.find(id);
    const updated = Object.assign(user, userData);
    return await this.userRepository.save(updated);
  }

  async sendMessage(body): Promise<any> {
    console.log(body);
    const user = await this.find(body.user);

    console.log(body, user);
    await this.mailerProvider.sendMail({
      to: user.email,
      from: body.email,
      subject: 'Message from blog',
      template: 'contact',
      context: {
        body: body.message,
        email: body.email
      },
    });
    return 1;  
  }

  /**
   * Delete user
   * @param id - user ID
   * @returns { User }
   */
  async delete(id): Promise<User> {
    const user = await this.find(id);
    return await this.userRepository.remove(user);
  }

}