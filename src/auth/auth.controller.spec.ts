import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('login', () => {
    it('should return an access token on successful login', async () => {
      const credentials = { username: 'johndoe', password: 'password' };
      const user = new User();
      user.id = '1';
      user.username = credentials.username;
      jest.spyOn(userService, 'findByUsername').mockResolvedValue(user);
      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('access-token');

      const result = await authController.login(credentials);

      expect(result).toEqual({ accessToken: 'access-token' });
    });
  });

});
