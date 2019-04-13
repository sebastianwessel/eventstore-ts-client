import {Eventstore, Event} from '../../../src'
import * as assert from 'assert'

describe('Persitent subscription test', (): void => {
  describe('with admin user rights', (): void => {
    const es = new Eventstore({
      clientId: 'ts-client-test',
      credentials: {
        username: 'admin',
        password: 'changeit'
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

    it('creates a persistent subscription', async (): Promise<void> => {
      const stream = await es.stream('subscribestream')
      try {
        await stream
          .withCredentials({username: 'admin', password: 'changeit'})
          .createPersistentSubscription('testgroup')
      } catch (err) {
        assert.fail(err)
      }
    })

    it('throws on creating persistent subscription with same names again', async (): Promise<
      void
    > => {
      const stream = await es.stream('subscribestream')
      try {
        await stream.createPersistentSubscription('testgroup')
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAlreadyExistError')
      }
    })
  })

  describe('with admin user rights', (): void => {
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

    it('throws on none admin right', async (): Promise<void> => {
      const stream = await es.stream('subscribestream')
      try {
        await stream.createPersistentSubscription('testgroup')
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
      }
    })
  })
})
