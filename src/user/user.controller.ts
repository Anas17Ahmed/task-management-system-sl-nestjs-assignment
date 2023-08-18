import { Body, Controller, Get, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }
}
