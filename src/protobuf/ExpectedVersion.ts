/**
 * @typedef {object} ExpectedVersion
 * - StreamExists
 * - Any
 * - NoStream
 * - EmptyStream
 */
export enum ExpectedVersion {
  StreamExists = -4,
  Any = -2,
  NoStream = -1,
  EmptyStream = -1
}
