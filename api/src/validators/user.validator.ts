import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(userEmail: any, args: ValidationArguments) {
    const userRepository = getRepository(User);
    return userRepository.find({ email: userEmail }).then(user => {
      return !(user.length > 0);
    });
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}

@ValidatorConstraint()
export class PasswordConfValid implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    return validationArguments.value === validationArguments.object['password'];
  }
}