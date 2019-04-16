import Long = require('long')

/** typescript interface for eventstore position in global log */
export interface ESPosition {
  commitPosition: Long
  preparePosition: Long
}

/**
 * Represents a position in eventstore global log file
 *
 * @export
 * @class Position
 */
export class Position {
  /** commit position part of position */
  public commitPosition: Long = Long.fromValue(0)

  /** prepare position part of position */
  public preparePosition: Long = Long.fromValue(0)

  /**
   *Creates an instance of Position.
   * @param {(Long | number)} commitPosition
   * @param {(Long | number)} preparePosition
   * @memberof Position
   */
  public constructor(commitPosition: Long | number, preparePosition: Long | number) {
    this.commitPosition =
      typeof commitPosition === 'number' ? Long.fromValue(commitPosition) : commitPosition
    this.preparePosition =
      typeof preparePosition === 'number' ? Long.fromValue(preparePosition) : preparePosition
  }

  /**
   * return start position in global log file
   */
  public static get Start(): ESPosition {
    return {
      commitPosition: Long.fromValue(0),
      preparePosition: Long.fromValue(0)
    }
  }

  /**
   * return end position in global log file
   */
  public static get End(): ESPosition {
    return {
      commitPosition: Long.fromValue(-1),
      preparePosition: Long.fromValue(-1)
    }
  }
}
