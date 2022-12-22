import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketStatusStateMachine } from './ticket.status.state.machine';
import { TicketService } from './tickets.service';

@Module({
  providers: [TicketService, TicketStatusStateMachine],
  controllers: [TicketController],
})
export class TicketModule {}
