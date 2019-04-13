import {Eventstore, Event} from '../../../src'
import * as assert from 'assert'

describe('Event emit tests', (): void => {
  const es = new Eventstore({
    clientId: 'ts-client-test',
    credentials: {
      username: 'restrictedUser',
      password: 'restrictedOnlyUserPassword'
    }
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
          subscription.on('event', resolve)
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
