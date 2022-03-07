import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UserSingUpDto {
  @IsString({
    message: 'UserName is invalid',
  })
  @IsOptional()
  username: string;

  @IsEmail(
    {},
    {
      message: 'Invalid Email',
    },
  )
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsString({
    message: 'Password is invalid',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password should contain minimum eight characters, at least one letter and one number',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;
}
