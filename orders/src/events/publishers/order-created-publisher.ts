import { Publisher, OrderCreatedEvent, Subjects } from "@stubhubtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
