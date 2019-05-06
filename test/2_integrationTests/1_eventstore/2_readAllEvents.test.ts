import * as assert from 'assert'
import {Eventstore, Position} from '../../../src'

describe('Read all events', (): void => {
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

  it('reads a slice from all events forward', async (): Promise<void> => {
    let slice
    try {
      slice = await es.readSliceForward(Position.Start, 100, true, true, {
        username: 'admin',
        password: 'changeit'
      })
      assert.ok('ok')
    } catch (err) {
      assert.fail(err)
    }

    assert.notStrictEqual(slice, undefined)
  })

  it('reads a slice from all events backward', async (): Promise<void> => {
    let slice
    try {
      slice = await es.readSliceBackward(Position.End, 100, true, true, {
        username: 'admin',
        password: 'changeit'
      })
      assert.ok('ok')
    } catch (err) {
      assert.fail(err)
    }

    assert.notStrictEqual(slice, undefined)
  })

  it('throws on access denied (forward)', async (): Promise<void> => {
    try {
      await es.readSliceForward(Position.Start)
      assert.fail('has not thrown')
    } catch (err) {
      assert.ok('has thrown')
      assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
    }
  })

  it('throws on access denied (backward)', async (): Promise<void> => {
    try {
      await es.readSliceBackward(Position.End)
      assert.fail('has not thrown')
    } catch (err) {
      assert.ok('has thrown')
      assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
    }
  })
})
