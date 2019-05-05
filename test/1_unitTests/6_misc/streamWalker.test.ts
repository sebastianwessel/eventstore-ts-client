/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Event} from '../../../src'
import {StreamWalker} from '../../../src/StreamWalker'
import * as assert from 'assert'

describe('Async iterator test', (): void => {
  const testData: Event[] = []

  before(() => {
    let count = 0
    const eventNameList = [
      'EventA',
      'EventB',
      'EventC',
      'EventD',
      'EventE',
      'EventF',
      'EventG',
      'EventH',
      'EventI',
      'EventJ'
    ]
    for (let x = 0, xMax = 1000; x < xMax; x++) {
      eventNameList.forEach((name) => {
        testData.push(new Event(name, {count}))
        count++
      })
    }
  })

  let generator = async function*() {
    for (let x = 0, xMax = testData.length; x < xMax; x++) {
      yield testData[x]
    }
  }

  beforeEach(async () => {
    generator = async function*() {
      for (let x = 0, xMax = testData.length; x < xMax; x++) {
        yield testData[x]
      }
    }
  })

  it('can iterate through', async (): Promise<void> => {
    const walker = new StreamWalker(generator())

    let checkCounter = 0
    for await (const value of walker) {
      assert.strictEqual(value.name, testData[checkCounter].name)
      checkCounter++
    }
    assert.strictEqual(checkCounter, testData.length)
  })

  it('can filter events', async (): Promise<void> => {
    const walker = new StreamWalker(generator())

    let checkCounter = 0
    for await (const value of walker.filter((event) => event.name != 'EventB')) {
      assert.notEqual(value.name, 'EventB')
      checkCounter++
    }
    assert.strictEqual(checkCounter, testData.length - 1000)
  })

  it('can reduce events to single value', async (): Promise<void> => {
    const walker = new StreamWalker(generator())
    const result = await walker.reduce((accumulator: number) => {
      accumulator++
      return accumulator
    }, 0)
    assert.strictEqual(result, testData.length)
  })

  it('can transform to array', async (): Promise<void> => {
    const walker = new StreamWalker(generator())
    const result = await walker.toArray()
    assert.strictEqual(JSON.stringify(result), JSON.stringify(testData))
  })

  it('can test all entries and return global result true', async (): Promise<void> => {
    const walker = new StreamWalker(generator())
    const result = await walker.every((event) => event.name.startsWith('Event'))
    assert.strictEqual(result, true)
  })

  it('can test all entries and return global result true', async (): Promise<void> => {
    const walker = new StreamWalker(generator())
    const result = await walker.every((event) => event.name.startsWith('EventA'))
    assert.strictEqual(result, false)
  })

  it('can combine filter and forEach', async (): Promise<void> => {
    const walker = new StreamWalker(generator())

    let checkCounter = 0
    await walker
      .filter((event) => event.name != 'EventB')
      .forEach((event) => {
        assert.notEqual(event.name, 'EventB')
        checkCounter++
      })

    assert.strictEqual(checkCounter, testData.length - 1000)
  })

  it('can combine filter, map and to array', async (): Promise<void> => {
    const walker = new StreamWalker(generator())

    const result = await walker
      .filter((event) => event.name != 'EventB')
      .map((event) => {
        event.name = 'NewName'
        return event
      })
      .toArray()
    assert.strictEqual(result.length, testData.length - 1000)
    assert.strictEqual(
      result.every((event: Event) => {
        return event.name === 'NewName'
      }),
      true
    )
  })

  it('throws on none function at filter', async () => {
    const walker = new StreamWalker(generator())

    try {
      await walker.filter(null)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreImplementationError')
    }
  })

  it('throws on none function at map', async () => {
    const walker = new StreamWalker(generator())

    try {
      await walker.map(null)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreImplementationError')
    }
  })

  it('throws on none function at forEach', async () => {
    const walker = new StreamWalker(generator())

    try {
      await walker.forEach(null)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreImplementationError')
    }
  })

  it('throws on none function at reduce', async () => {
    const walker = new StreamWalker(generator())

    try {
      await walker.reduce(null)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreImplementationError')
    }
  })

  it('throws on none function at every', async () => {
    const walker = new StreamWalker(generator())

    try {
      await walker.every(null)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreImplementationError')
    }
  })
})
