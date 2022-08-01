import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@stubhubtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
