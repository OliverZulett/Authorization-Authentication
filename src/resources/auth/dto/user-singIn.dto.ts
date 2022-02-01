import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class UserSingInDto {
  @IsEmail({}, {
    message: 'Invalid Email'
  })
  @IsNotEmpty({
    message: 'Email is required'
  })
  email: string;

  @IsString({
    message: 'Invalid password'
  })
  @IsNotEmpty({
    message: 'Password is required'
  })
  password: string;
}
