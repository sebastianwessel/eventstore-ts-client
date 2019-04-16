import {Eventstore, Event} from '../../../src'
import * as assert from 'assert'

describe('Stream subscription tests', (): void => {
  const es = new Eventstore({
    uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
    clientId: 'ts-client-test',
    useSSL: true
  })
  before(
    async (): Promise<void> => {
      await es.connect()
    }
  )

  after(
    async (): Promise<void> => {
      await es.disconnect()
    }
  )

  it('subscribes and unsubscribes to a stream', async (): Promise<void> => {
    const stream = await es.stream('subscribestream')
    let subscription
    try {
      subscription = await stream.subscribe()
      assert.strictEqual(subscription.isSubscribed, true)
    } catch (err) {
      assert.fail(err)
    }
    try {
      await subscription.unsubscribe()
      assert.strictEqual(subscription.isSubscribed, false)
    } catch (err) {
      assert.fail(err)
    }
  })

  it('returns subscription name', async (): Promise<void> => {
    const stream = await es.stream('subscribestream')
    let subscription
    try {
      subscription = await stream.subscribe()
      assert.strictEqual(subscription.isSubscribed, true)
    } catch (err) {
      assert.fail(err)
    }
    assert.notStrictEqual(subscription.name, null)
    assert.notStrictEqual(subscription.name, undefined)
    try {
      await subscription.unsubscribe()
      assert.strictEqual(subscription.isSubscribed, false)
    } catch (err) {
      assert.fail(err)
    }
  })

  it('returns true for resolve links', async (): Promise<void> => {
    const stream = await es.stream('subscribestream')
    let subscription
    try {
      subscription = await stream.subscribe()
      assert.strictEqual(subscription.isSubscribed, true)
    } catch (err) {
      assert.fail(err)
    }
    assert.strictEqual(subscription.getResolveLinkTos(), true)
    try {
      await subscription.unsubscribe()
      assert.strictEqual(subscription.isSubscribed, false)
    } catch (err) {
      assert.fail(err)
    }
  })

  it('returns false for not resolve links', async (): Promise<void> => {
    const stream = await es.stream('subscribestream')
    let subscription
    try {
      subscription = await stream.subscribe(false)
      assert.strictEqual(subscription.isSubscribed, true)
    } catch (err) {
      assert.fail(err)
    }
    assert.strictEqual(subscription.getResolveLinkTos(), false)
    try {
      await subscription.unsubscribe()
      assert.strictEqual(subscription.isSubscribed, false)
    } catch (err) {
      assert.fail(err)
    }
  })

  it('logs on error', async (): Promise<void> => {
    const stream = await es.stream('subscribestream')
    let subscription
    try {
      subscription = await stream.subscribe()
      assert.strictEqual(subscription.isSubscribed, true)
      subscription.emit('error', new Error('Log some error'))
    } catch (err) {
      assert.fail(err)
    }
    try {
      await subscription.unsubscribe()
      assert.strictEqual(subscription.isSubscribed, false)
    } catch (err) {
      assert.fail(err)
    }
  })

  it('receives events', async (): Promise<void> => {
    const newEvent = new Event('SingleEventWritten')
    const stream = await es.stream('subscribestream')
    let subscription
    try {
      subscription = await stream.subscribe()
      assert.strictEqual(subscription.isSubscribed, true)
    } catch (err) {
      assert.fail(err)
    }

    const result: {event: Event; commitPosition: Long; preparePosition: Long} = await Promise.race([
      new Promise(
        (resolve, reject): void => {
          setTimeout(reject, 1000)
        }
      ),
      new Promise(
        async (resolve, reject): Promise<void> => {
          const resolveFunction = (
            event: Event,
            commitPosition: Long,
            preparePosition: Long
          ): void => {
            resolve({event, commitPosition, preparePosition})
          }
          subscription.on('event', resolveFunction)
          try {
            await stream.append(newEvent)
          } catch (err) {
            reject(err)
          }
        }
      )
    ])
    assert.strictEqual(result.event.id, newEvent.id)
    try {
      await subscription.unsubscribe()
      assert.strictEqual(subscription.isSubscribed, false)
    } catch (err) {
      assert.fail(err)
    }
  })
})
