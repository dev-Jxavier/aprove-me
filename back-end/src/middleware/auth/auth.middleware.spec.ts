import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let jwtService: JwtService;

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMiddleware,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    middleware = module.get<AuthMiddleware>(AuthMiddleware);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should call next if the token is valid', async () => {
      const req = {
        headers: { authorization: 'validToken' },
      } as unknown as Request;
      const next = jest.fn();

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({});

      await middleware.use(req, {}, next);

      expect(jwtService.verifyAsync).toHaveBeenCalledWith('validToken');
      expect(next).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if no token is provided', async () => {
      const req = {
        headers: {},
      } as unknown as Request;

      const next = jest.fn();

      await expect(middleware.use(req, {}, next)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if the token is invalid', async () => {
      const req = {
        headers: { authorization: 'invalidToken' },
      } as unknown as Request;

      const next = jest.fn();

      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));

      await expect(middleware.use(req, {}, next)).rejects.toThrow(ForbiddenException);
    });
  });
});
