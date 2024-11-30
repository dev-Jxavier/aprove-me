import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Credentials } from './dto/credentials-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async login(credentials: Credentials) {
    const validateLogin = "aprovame"
    if (!(credentials.login === validateLogin && credentials.password === validateLogin)) throw new UnauthorizedException('Login não autorizado!');

    return {
      access_token: await this.jwtService.signAsync(credentials)
    }
  }
}
