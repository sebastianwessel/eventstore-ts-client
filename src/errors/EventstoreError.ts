/**
 * Eventstore error base class
 */
export class EventstoreError extends Error {
  /** @type {Error|null} */
  public rootCause: Error | null = null

  /**
   * Creates new instance of EventstoreError
   */
  public constructor(
    message: string,
    name: string = 'EventstoreError',
    rootCause: Error | null = null
  ) {
    super(message)

    /** Set name of error */
    this.name = name
    this.rootCause = rootCause
  }
}
