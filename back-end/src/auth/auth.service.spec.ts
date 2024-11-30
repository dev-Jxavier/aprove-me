import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from './dto/credentials-auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: JwtService,
        useValue: mockJwtService,
      },],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token for valid credentials', async () => {
      const credentials: Credentials = { login: 'aprovame', password: 'aprovame' };
      const access_token = 'access_token';

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(access_token);

      const result = await service.login(credentials);

      expect(result).toEqual({ access_token });
      expect(jwtService.signAsync).toHaveBeenCalledWith(credentials);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const credentials = { login: 'wrong', password: 'wrong' };

      await expect(service.login(credentials)).rejects.toThrow(UnauthorizedException);
    });
  });
});
