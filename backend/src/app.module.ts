import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [TicketModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
