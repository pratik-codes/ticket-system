import { IsEnum, IsNotEmpty } from 'class-validator';

export enum TicketState {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CODE_REVIEW = 'code_review',
}
export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsEnum(TicketState, {
    message:
      'updateStatus must be one of the following values: open, in_progress, code_review',
  })
  updateStatus: string;
}
