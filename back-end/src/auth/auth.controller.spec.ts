import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Credentials } from './dto/credentials-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should realized login', async () => {
    const login: Credentials = {
      login: "aprovame",
      password: "aprovame"
    }

    const access_token = "access_token"

    jest.spyOn(service, 'login').mockResolvedValue({ access_token })

    expect(await controller.login(login)).toEqual({ access_token })
    expect(service.login).toHaveBeenCalledWith(login)
  });
});
