import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './dto/credentials-auth.dto';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() credentials: Credentials) {
    return this.authService.login(credentials);
  }

}
