/**
 * Eventstore error base class
 *
 * @export
 * @class EventstoreError
 * @extends {Error}
 */
export class EventstoreError extends Error {
  public rootCause: Error | null = null
  public constructor(
    message: string,
    name: string = 'EventstoreError',
    rootCause: Error | null = null
  ) {
    super(message)
    this.name = name
    this.rootCause = rootCause
  }
}
