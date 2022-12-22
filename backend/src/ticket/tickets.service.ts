import { Injectable } from '@nestjs/common';
import { Ticket } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { TicketStatusStateMachine } from './ticket.status.state.machine';

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    private statusStateMachine: TicketStatusStateMachine,
  ) {}

  async allTickets(): Promise<Ticket[]> {
    return await this.prisma.ticket.findMany();
  }

  async singleTicket(id: string): Promise<Ticket> {
    return await this.prisma.ticket.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateStatus(id: string, updateStatus: string): Promise<Ticket> {
    const ticket: any = await this.prisma.ticket.findUnique({
      where: { id: parseInt(id) },
    });

    this.statusStateMachine.checkIfAllowedTransition(
      ticket?.status,
      updateStatus,
    );

    return await this.prisma.ticket.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: updateStatus,
      },
    });
  }
}
