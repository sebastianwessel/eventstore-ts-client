import {Eventstore, Event} from '../../../src'
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
        await stream.createPersistentSubscription('persistentsubscription2')
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })

    it('throws on update', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        const subscription = stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersistentSubscription('persistentsubscription2')
        await subscription.update({resolveLinkTos: false})
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })

    it('throws on delete', async (): Promise<void> => {
      const stream = es.stream('subscribestream')
      try {
        const subscription = stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersistentSubscription('persistentsubscription2')
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
        await es
          .stream('persistentsubscribestream')
          .createPersistentSubscription(
            'persistentsubscription',
            {},
            {username: 'admin', password: 'changeit'}
          )
      }
    )

    after(
      async (): Promise<void> => {
        await es.disconnect()
      }
    )

    it('can start a subscription on empty stream', async (): Promise<void> => {
      const subscription = es
        .stream('persistentsubscribestream')
        .getPersistentSubscription('persistentsubscription')
      await subscription.start()
      assert.strictEqual(
        subscription.name,
        `PersistentSubsbscription: persistentsubscribestream :: persistentsubscription`
      )
    })

    it('can start a subscription on none empty stream', async (): Promise<void> => {
      const newEvent = new Event('SomeEvent')
      const stream = es.stream('persistentsubscribestream')
      await stream.append(newEvent)
      const subscription = stream.getPersistentSubscription('persistentsubscription')
      await subscription.start()
      await new Promise(
        async (resolve): Promise<void> => {
          setTimeout(resolve, 3000)
        }
      )
    })
  })
})
