import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@stubhubtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
