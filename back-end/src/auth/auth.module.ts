import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: async () => ({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    }),
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
