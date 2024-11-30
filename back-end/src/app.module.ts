import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './prisma/prisma.service';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' }
      }), 
    }),
    PayableModule, AssignorModule,
  ],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      { path: "/integrations/auth", method: RequestMethod.POST }
    ).forRoutes("*")
  }

}
