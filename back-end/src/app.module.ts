import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationsModule } from './integrations/integrations.module';
import { PayableModule } from './payable/payable.module';

@Module({
  imports: [IntegrationsModule, PayableModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
