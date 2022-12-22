import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { TicketService } from './tickets.service';
import { IndexApiResponseType, ShowApiResponseType } from './types';
import { UpdateStatusDTO } from './update.status.dto';

@UseInterceptors(TransformInterceptor)
@Controller('tickets')
export class TicketController {
  constructor(private ticketsService: TicketService) {}

  /**
   * Function that return users all tickers list
   * @author   Pratik Tiwari
   * */
  @Get()
  async index(): Promise<IndexApiResponseType> {
    const result = await this.ticketsService.allTickets();
    return { message: 'Success', result };
  }

  /**
   * Function that return a single airport on iata
   * @author   Pratik Tiwari
   * @param    {id} id for a ticket
   */
  @Get('/:id')
  async show(@Param('id') id: string): Promise<ShowApiResponseType> {
    const result = await this.ticketsService.singleTicket(id);
    return { message: 'Success', result };
  }

  /**
   * Function that return a single ticket which is updated
   * @author   Pratik Tiwari
   * @param    {id} id for a ticket
   */
  @Patch('/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDTO: UpdateStatusDTO,
  ): Promise<ShowApiResponseType> {
    const { updateStatus } = updateStatusDTO;
    const result = await this.ticketsService.updateStatus(id, updateStatus);
    return { message: 'Ticket successfully updated.', result };
  }
}
