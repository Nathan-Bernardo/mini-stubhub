import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@stubhubtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
