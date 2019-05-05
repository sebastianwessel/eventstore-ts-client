import {Eventstore, Event, SubscriptionStatus, NakAction} from '../../../src'
import * as assert from 'assert'

describe('Persistent subscription test', (): void => {
  describe('with admin user rights', (): void => {
    const es = new Eventstore({
      uri: 'discover://admin:changeit@cluster1.escluster.net:2112',
      clientId: 'ts-client-test'
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

    it('creates a persistent subscription', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        await stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .createPersistentSubscription('persistentsubscription')
      } catch (err) {
        assert.fail(err)
      }
    })

    it('updates a persistent subscription', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        const subscription = stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersistentSubscription('persistentsubscription')
        await subscription.update({resolveLinkTos: false})
      } catch (err) {
        assert.fail(err)
      }
    })

    it('throws on creating persistent subscription with same names again', async (): Promise<
      void
    > => {
      const stream = es.stream('subscribestream')
      try {
        await stream.createPersistentSubscription('persistentsubscription')
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAlreadyExistError')
      }
    })

    it('deletes a persistent subscription', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        const subscription = stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersistentSubscription('persistentsubscription')
        await subscription.delete()
      } catch (err) {
        assert.fail(err)
      }
    })

    it('throws on delete', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        const subscription = stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersistentSubscription('unknown')
        await subscription.delete()
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreDoesNotExistError')
      }
    })
  })

  describe('without admin user rights', (): void => {
    const es = new Eventstore({
      uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
      clientId: 'ts-client-test'
    })
    before(
      async (): Promise<void> => {
        await es.connect()
        const stream = es
          .stream('subscribestream')
          .withCredentials({username: 'admin', password: 'changeit'})
        await stream.createPersistentSubscription('persistentsubscription2')
      }
    )

    after(
      async (): Promise<void> => {
        await es.disconnect()
      }
    )

    it('throws on create', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        await stream.createPersistentSubscription('persistentsubscription1')
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })

    it('throws on update', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        const subscription = stream.getPersistentSubscription('persistentsubscription2')
        await subscription.update({resolveLinkTos: false})
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })

    it('throws on delete', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        const subscription = stream.getPersistentSubscription('persistentsubscription2')
        await subscription.delete()
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })
  })

  describe('Persistent subscription get events', (): void => {
    const es = new Eventstore({
      uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
      clientId: 'ts-client-test'
    })
    before(
      async (): Promise<void> => {
        await es.connect()
        const stream = es.stream('persistentsubscribestream3')
        const newEvent = new Event('SomeEvent')
        await stream.append(newEvent)
        try {
          await stream.createPersistentSubscription(
            'persistentsubscription3',
            {},
            {username: 'admin', password: 'changeit'}
          )
        } catch (err) {
          console.log(err)
        }
      }
    )

    after(
      async (): Promise<void> => {
        await es.disconnect()
      }
    )

    it('can start a subscription on none empty stream', async (): Promise<void> => {
      const stream = es.stream('persistentsubscribestream3')
      const newEvent = new Event('SomeEvent')
      await stream.append(newEvent)
      let counter = 0
      const subscription = stream.getPersistentSubscription('persistentsubscription3')

      subscription.on(
        'event',
        (event): void => {
          counter++
          subscription.acknowledgeEvent(event)
        }
      )

      await subscription.subscribe(10, {
        username: 'restrictedUser',
        password: 'restrictedOnlyUserPassword'
      })

      assert.strictEqual(
        subscription.name,
        `PersistentSubscription: persistentsubscribestream3 :: persistentsubscription3`
      )
      assert.strictEqual(subscription.state, SubscriptionStatus.connected)

      await new Promise(
        async (resolve): Promise<void> => {
          await stream.append(new Event('SomeEvent'))
          setTimeout(resolve, 1000)
        }
      )

      assert.strictEqual(counter, 3)

      await subscription.unsubscribe()

      assert.strictEqual(subscription.state, SubscriptionStatus.disconnected)
    })

    it('can notAck events', async (): Promise<void> => {
      const stream = es.stream('persistentsubscribestream3')
      const newEvent = new Event('SomeEvent444')
      await stream.append(newEvent)
      const subscription = stream.getPersistentSubscription('persistentsubscription3')
      let counter = 0

      subscription.on(
        'event',
        (event): void => {
          counter++
          assert.strictEqual(event.id, newEvent.id)
          subscription.notAcknowledgeEvent(event, NakAction.Unknown)
        }
      )

      await subscription.subscribe()

      await new Promise(
        async (resolve): Promise<void> => {
          setTimeout(resolve, 1000)
        }
      )

      await subscription.unsubscribe()

      await new Promise(
        async (resolve): Promise<void> => {
          setTimeout(resolve, 1000)
        }
      )

      assert.strictEqual(counter > 0, true)
    })
  })
})
