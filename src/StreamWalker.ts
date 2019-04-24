/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Event} from './event'
import * as eventstoreError from './errors'

export class StreamWalker {
  protected iterable: AsyncIterableIterator<Event | null>
  public constructor(iterable: AsyncIterableIterator<Event | null>) {
    this.iterable = iterable
  }

  public async *[Symbol.asyncIterator]() {
    for await (const value of this.iterable) {
      yield value
    }
  }

  /**
   * The map() method creates a new iterator with the results of calling a provided function on every element in the calling iterator
   * @param {function} fn - Function that produces an element of the new iterator
   * @param {any} [thisArg] - Optional. The value of this provided for the call to a function
   * @return {AsyncIterator}
   */
  public map(fn: Function, thisArg?: Function) {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }

    const a = async function*(iterable: AsyncIterable<Event | null>) {
      for await (const value of iterable) {
        yield fn.call(thisArg, value)
      }
    }
    return new StreamWalker(a(this.iterable))
  }

  /**
   * The filter() method creates a new iterator with all elements that pass the test implemented by the provided function
   * @param {function} fn - Function is a predicate, to test each element of the iterator. Return true to keep the element, false otherwise
   * @param {any} [thisArg] - Optional. The value of this provided for the call to a function
   * @return {AsyncIterator}
   */
  public filter(fn: Function, thisArg?: Function) {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }

    const iterable = this.iterable
    const b = async function*(fn: Function, thisArg?: Function) {
      for await (const value of iterable) {
        if (fn.call(thisArg, value)) {
          yield value
        }
      }
    }

    return new StreamWalker(b(fn, thisArg))
  }

  /**
   * The forEach() method executes a provided function once for each iterator element
   * @param {function} fn - Function to execute for each element
   * @param {any} [thisArg] - Optional. The value of this provided for the call to a function
   * @param {any} [args] - optional parameters to pass to function
   */
  public async forEach(fn: Function, thisArg?: Function, ...args: any[]): Promise<void> {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }
    const iterable = this.iterable
    for await (const value of iterable) {
      fn.call(thisArg, value, ...args)
    }
  }

  /**
   * The reduce() method applies a function against an accumulator and each element in the iterator (from left to right) to reduce it to a single value
   * @param {Function} accumulatorFunction - Function to execute on each element in the iterator
   * @param {any} initialValue - The initialValue accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied
   * @param {any} [thisArg] - Optional. The value of this provided for the call to a function
   */
  public async reduce(accumulatorFunction: Function, initialValue: any = null, thisArg?: Function) {
    if (typeof accumulatorFunction !== 'function') {
      throw eventstoreError.newImplementationError(accumulatorFunction + 'is not a function')
    }
    const iterable = this.iterable
    let returnValue = initialValue
    for await (const value of iterable) {
      returnValue = accumulatorFunction.call(thisArg, returnValue, value)
    }
    return returnValue
  }

  /**
   * Converts an iterator to an array.
   * The returned array will contain all single elements of iterator
   * @returns {Array}
   */
  public async toArray() {
    const iterable = this.iterable
    const arrayValue = []
    for await (const value of iterable) {
      arrayValue.push(value)
    }
    return arrayValue
  }

  /**
   * The every() method tests whether all elements in the iterator pass the test implemented by the provided function
   * @param {Function} fn - function which tests current value
   * @param {any} [thisArg] - Optional. The value of this provided for the call to a function
   * @returns {Boolean}
   */
  public async every(fn: Function, thisArg?: Function) {
    if (typeof fn !== 'function') {
      throw eventstoreError.newImplementationError(fn + 'is not a function')
    }
    const iterable = this.iterable
    for await (const value of iterable) {
      if (fn.call(thisArg, value) === false) {
        return false
      }
    }
    return true
  }
}
