import {Eventstore} from '../../../src'
import * as assert from 'assert'

describe('Stream tests', (): void => {
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

  describe('Get stream metadata', async (): Promise<void> => {
    it('returns null for existing stream with no metadata', async (): Promise<void> => {
      const metadata = await es
        .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
        .getMetadata()
      assert.strictEqual(metadata, null)
    })

    it('reads metadata for stream on master node', async (): Promise<void> => {
      const metadata = await es
        .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
        .requiresMaster()
        .getMetadata()
      assert.strictEqual(metadata, null)
    })

    it('returns null for not existing stream', async (): Promise<void> => {
      const metadata = await es.stream('notexistingstream').getMetadata()
      assert.strictEqual(metadata, null)
    })

    it('throws on metadata stream', async (): Promise<void> => {
      try {
        await es.stream('$$teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5').getMetadata()
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreBadRequestError')
      }
    })

    it('throws on invalid access rights', async (): Promise<void> => {
      try {
        await es
          .stream('$teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
          .withCredentials({username: 'invalid', password: 'wrong'})
          .getMetadata()
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreNotAuthenticatedError')
      }
    })
  })

  describe('Set stream metadata', async (): Promise<void> => {
    it('writes stream metadata', async (): Promise<void> => {
      const testData = {foo: 'bar'}
      try {
        await es
          .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
          .setMetadata(testData)
        assert.ok('has written')
        const result = await es
          .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
          .getMetadata()
        assert.strictEqual(JSON.stringify(result), JSON.stringify(testData))
      } catch (err) {
        assert.fail(err)
      }
    })

    it('writes stream metadata (require master)', async (): Promise<void> => {
      try {
        await es
          .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
          .requiresMaster()
          .setMetadata({foo: 'bar'})
        assert.ok('has written')
      } catch (err) {
        assert.fail(err)
      }
    })

    it('throws on metadata stream', async (): Promise<void> => {
      try {
        await es
          .stream('$$teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
          .setMetadata({foo: 'bar'})
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreBadRequestError')
      }
    })
  })
})
