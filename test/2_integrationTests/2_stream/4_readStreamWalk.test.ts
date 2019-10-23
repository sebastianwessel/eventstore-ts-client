import * as assert from 'assert'
import {Eventstore} from '../../../src'
describe('Walk stream tests', (): void => {
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

  it('can walk to stream forward', async (): Promise<void> => {
    const walker = await es
      .stream('tenthousandstream-f73cff95-564b-4da4-8072-4d761db6cd34')
      .walkStreamForward()

    let checkCounter = 0
    for await (const value of walker) {
      assert.strictEqual(value.data.count, checkCounter)
      checkCounter++
    }
    assert.strictEqual(checkCounter, 10001)
  })

  it('can walk to stream forward with master required', async (): Promise<void> => {
    const walker = await es
      .stream('tenthousandstream-f73cff95-564b-4da4-8072-4d761db6cd34')
      .walkStreamForward(0, true, true)

    let checkCounter = 0
    for await (const value of walker) {
      assert.strictEqual(value.data.count, checkCounter)
      checkCounter++
    }
    assert.strictEqual(checkCounter, 10001)
  })

  it('can walk to stream backward', async (): Promise<void> => {
    const walker = await es
      .stream('tenthousandstream-f73cff95-564b-4da4-8072-4d761db6cd34')
      .walkStreamBackward()

    let checkCounter = 10001
    for await (const value of walker) {
      checkCounter--
      assert.strictEqual(value.data.count, checkCounter)
    }
    assert.strictEqual(checkCounter, 0)
  })
})
