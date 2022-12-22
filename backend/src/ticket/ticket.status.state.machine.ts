import { BadRequestException, HttpStatus } from '@nestjs/common';

// a proper state machine like xstate can also be used here the status will grow this will help us manage states very well
export class TicketStatusStateMachine {
  private allowedDropdownStatusMap: any = {
    open: ['in_progress'],
    in_progress: ['code_review', 'open'],
    code_review: ['in_progress'],
  };

  checkIfAllowedTransition(currentStatus: string, statusToBeUpdatedAt: string) {
    const allowedStates = this.allowedDropdownStatusMap[currentStatus] || [];
    if (!allowedStates.includes(statusToBeUpdatedAt))
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: `Transition to the ${statusToBeUpdatedAt} is not allowed`,
      });
  }
}
