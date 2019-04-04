export class Event {
  protected eventName: string
  public constructor(eventName: string = 'Event') {
    this.eventName = eventName
  }
}
