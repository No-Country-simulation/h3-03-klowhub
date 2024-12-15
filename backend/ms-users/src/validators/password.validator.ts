// src/validators/password.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: any) {
    const user = args.object as any; // Obtén el objeto completo
    const name = user.name || ''; // Obtener el nombre del objeto que se valida
    const email = user.email || ''; // Obtener el email del objeto que se valida

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;
    const doesNotContainName = !password.includes(name);
    const doesNotContainEmail = !password.includes(email);

    return (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasMinLength &&
      doesNotContainName &&
      doesNotContainEmail
    );
  }

  defaultMessage() {
    return 'La contraseña debe tener al menos 8 caracteres, incluir al menos una mayúscula, una minúscula, un número, no debe incluir el nombre y no debe incluir el email.';
  }
}

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordConstraint,
    });
  };
}
