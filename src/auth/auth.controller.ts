import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: Partial<User>): Promise<{ accessToken: string }> {
    const loggedInUser = await this.authService.validateUser(user.username, user.password);

    if (!loggedInUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.authService.login(loggedInUser);
    return { accessToken };
  }
}
