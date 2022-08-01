import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@stubhubtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
