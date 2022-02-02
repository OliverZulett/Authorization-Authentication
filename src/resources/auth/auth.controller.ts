import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSingUpDto } from './dto/user-singUp.dto';
import { UserSingInDto } from './dto/user-singIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  singUp(@Body() userSingUpDto: UserSingUpDto) {
    return this.authService.signUp(userSingUpDto);
  }
  
  @Get('sign-in')
  singIn(@Body() userSingInDto: UserSingInDto) {
    return this.authService.signIn(userSingInDto);
  }
}
