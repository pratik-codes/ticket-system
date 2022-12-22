import { Ticket } from '@prisma/client';

export interface ShowApiResponseType {
  message: string;
  result: Ticket;
}

export interface IndexApiResponseType {
  message: string;
  result: Ticket[];
}
