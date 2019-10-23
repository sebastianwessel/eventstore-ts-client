/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Event} from './event'
import * as eventstoreError from './errors'
/**
 * Stream walker
 */
export class StreamWalker {
  /** iterable  */
  protected iterable: AsyncIterableIterator<Event | null>

  /**
   * Creates an instance of stream walker.
   */
  public constructor(iterable: AsyncIterableIterator<Event | null>) {
    this.iterable = iterable
  }

  /** standard async iterable function */
  public async *[Symbol.asyncIterator]() {
    for await (const value of this.iterable) {
      yield value
    }
  }

  /**
   * The map() method creates a new iterator with the results of calling a provided function on every element in the calling iterator
   */
  public map(fn: Function, thisArg?: Function): StreamWalker {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }

    const a = async function*(iterable: AsyncIterable<Event | null>) {
      for await (const value of iterable) {
        yield await fn.call(thisArg, value)
      }
    }
    return new StreamWalker(a(this.iterable))
  }

  /**
   * The filter() method creates a new iterator with all elements that pass the test implemented by the provided function
   */
  public filter(fn: Function, thisArg?: Function): StreamWalker {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }

    const iterable = this.iterable
    const b = async function*(innerFn: Function, thisInnerArg?: Function) {
      for await (const value of iterable) {
        if (await innerFn.call(thisInnerArg, value)) {
          yield value
        }
      }
    }

    return new StreamWalker(b(fn, thisArg))
  }

  /**
   * The forEach() method executes a provided function once for each iterator element
   */
  public async forEach(fn: Function, thisArg?: Function, ...args: any[]): Promise<void> {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }
    const iterable = this.iterable
    for await (const value of iterable) {
      await fn.call(thisArg, value, ...args)
    }
  }

  /**
   * The reduce() method applies a function against an accumulator and each element in the iterator (from left to right) to reduce it to a single value
   */
  public async reduce(
    accumulatorFunction: Function,
    initialValue: any = null,
    thisArg?: Function
  ): Promise<any> {
    if (typeof accumulatorFunction !== 'function') {
      throw eventstoreError.newImplementationError(accumulatorFunction + 'is not a function')
    }
    const iterable = this.iterable
    let returnValue = initialValue
    for await (const value of iterable) {
      returnValue = await accumulatorFunction.call(thisArg, returnValue, value)
    }
    return returnValue
  }

  /**
   * Converts an iterator to an array.
   * The returned array will contain all single elements of iterator
   */
  public async toArray(): Promise<(Event | null)[]> {
    const iterable = this.iterable
    const arrayValue = []
    for await (const value of iterable) {
      arrayValue.push(value)
    }
    return arrayValue
  }

  /**
   * The every() method tests whether all elements in the iterator pass the test implemented by the provided function
   */
  public async every(fn: Function, thisArg?: Function): Promise<boolean> {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }
    const iterable = this.iterable
    for await (const value of iterable) {
      if ((await fn.call(thisArg, value)) === false) {
        return false
      }
    }
    return true
  }
}
