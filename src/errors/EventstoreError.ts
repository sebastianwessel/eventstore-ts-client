/**
 * Eventstore error base class
 *
 * @export
 * @class EventstoreError
 * @extends {Error}
 */
export class EventstoreError extends Error {
  /** @type {Error|null} */
  public rootCause: Error | null = null

  /**
   * Creates new instance of EventstoreError
   *
   * @param {string} message - error message
   * @param {name} name - name of error
   * @param {Error|null} rootCause - causing error
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
