import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@stubhubtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
