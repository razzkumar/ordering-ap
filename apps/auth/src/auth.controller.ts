import { Controller, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(response);
  }

  @MessagePattern('validate_user')
  @UseGuards(JwtAuthGuard)
  async validateUser(@CurrentUser() user: User) {
    this.logger.log(`Validating user: ${user.email}`);
    return user;
  }
}
