import {Position} from '../../../src/eventstore'
import * as assert from 'assert'
import Long = require('long')

describe('Test position class', (): void => {
  it('creates a new instance from numbers', (): void => {
    const newPosition = new Position(0, 0)
    assert.strictEqual(newPosition.commitPosition.compare(0), 0)
    assert.strictEqual(newPosition.preparePosition.compare(0), 0)
  })

  it('creates a new instance from Long', (): void => {
    const newPosition = new Position(Long.fromValue(0), Long.fromValue(0))
    assert.strictEqual(newPosition.commitPosition.compare(0), 0)
    assert.strictEqual(newPosition.preparePosition.compare(0), 0)
  })
})
