import {Eventstore, Event} from '../../../src'
import * as assert from 'assert'

describe('Persitent subscription test', (): void => {
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
      const stream = await es.stream('subscribestream')
      try {
        await stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .createPersistentSubscription('persitentsubscription')
      } catch (err) {
        assert.fail(err)
      }
    })

    it('updates a persistent subscription', async (): Promise<void> => {
      const stream = await es.stream('subscribestream')
      try {
        const subscription = await stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersitentSubscription('persitentsubscription')
        await subscription.update({resolveLinkTos: false})
      } catch (err) {
        assert.fail(err)
      }
    })

    it('throws on creating persistent subscription with same names again', async (): Promise<
      void
    > => {
      const stream = await es.stream('subscribestream')
      try {
        await stream.createPersistentSubscription('persitentsubscription')
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAlreadyExistError')
      }
    })

    it('deletes a persistent subscription', async (): Promise<void> => {
      const stream = await es.stream('subscribestream')
      try {
        const subscription = await stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersitentSubscription('persitentsubscription')
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
        const stream = await es
          .stream('subscribestream')
          .withCredentials({username: 'admin', password: 'changeit'})
        await stream.createPersistentSubscription('persitentsubscription2')
      }
    )

    after(
      async (): Promise<void> => {
        await es.disconnect()
      }
    )

    it('throws on create', async (): Promise<void> => {
      const stream = await es.stream('subscribestream')
      try {
        await stream.createPersistentSubscription('persitentsubscription2')
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })

    it('throws on update', async (): Promise<void> => {
      const stream = await es.stream('subscribestream')
      try {
        const subscription = await stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersitentSubscription('persitentsubscription2')
        await subscription.update({resolveLinkTos: false})
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })

    it('throws on delete', async (): Promise<void> => {
      const stream = await es.stream('subscribestream')
      try {
        const subscription = await stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .getPersitentSubscription('persitentsubscription2')
        await subscription.delete()
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })
  })
})
