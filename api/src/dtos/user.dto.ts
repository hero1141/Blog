import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsUserAlreadyExist, PasswordConfValid } from '../validators/user.validator';

export class CreateUserDto {
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another email.',
  })

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Validate(PasswordConfValid, {
    message: 'Passwords must be the same',
  })
  passwordConfirmation: string;
}