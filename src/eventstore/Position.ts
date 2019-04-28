import Long = require('long')

/** typescript interface for eventstore position in global log */
export interface ESPosition {
  commitPosition: Long
  preparePosition: Long
}

/**
 * Represents a position in eventstore global log file
 */
export class Position {
  /** commit position part of position */
  public commitPosition: Long = Long.fromValue(0)

  /** prepare position part of position */
  public preparePosition: Long = Long.fromValue(0)

  /**
   *Creates an instance of Position.
   */
  public constructor(commitPosition: Long | number, preparePosition: Long | number) {
    this.commitPosition =
      typeof commitPosition === 'number' ? Long.fromValue(commitPosition) : commitPosition
    this.preparePosition =
      typeof preparePosition === 'number' ? Long.fromValue(preparePosition) : preparePosition
  }

  /**
   * Compares two Position values
   */
  public compareTo(position: Position): number {
    if (
      this.commitPosition.lt(position.commitPosition) ||
      (this.commitPosition.eq(position.commitPosition) &&
        this.preparePosition.lt(position.preparePosition))
    ) {
      return -1
    }
    if (
      this.commitPosition.gt(position.commitPosition) ||
      (this.commitPosition.eq(position.commitPosition) &&
        this.preparePosition.gt(position.preparePosition))
    ) {
      return 1
    }
    return 0
  }

  /**
   * return start position in global log file
   */
  public static get Start(): Position {
    return new Position(Long.fromValue(0), Long.fromValue(0))
  }

  /**
   * return end position in global log file
   */
  public static get End(): Position {
    return new Position(Long.fromValue(-1), Long.fromValue(-1))
  }
}
