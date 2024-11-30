import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  async use(req: Request, res: any, next: () => void) {
    const token = req.headers["authorization"]
    if (!token) throw new ForbiddenException('Não autorizado!')
    try {
      await this.jwtService.verifyAsync(token)
      next();
    } catch (error) {
      throw new ForbiddenException('Não autorizado!')
    }

  }
}
