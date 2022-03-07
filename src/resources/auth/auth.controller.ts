import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSingUpDto } from './dto/user-singUp.dto';
import { UserSingInDto } from './dto/user-singIn.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseGuards(AuthGuard('basic'))
  singUp(@Body() userSingUpDto: UserSingUpDto) {
    return this.authService.signUp(userSingUpDto);
  }

  @Get('sign-in')
  singIn(@Body() userSingInDto: UserSingInDto) {
    return this.authService.signIn(userSingInDto);
  }
}
