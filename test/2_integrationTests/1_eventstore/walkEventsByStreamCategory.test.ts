/* eslint-disable @typescript-eslint/no-explicit-any */
import * as assert from 'assert'
import {Eventstore} from '../../../src'

describe('walkEventsByStreamCategory', (): void => {
  const es = new Eventstore({
    uri: 'discover://admin:changeit@cluster1.escluster.net:2112',
    clientId: 'ts-client-test',
    useSSL: true
  })

  const validateIdArray = [
    '0ce2988f-bbe9-43f9-b35f-7ebdc1089ce5',
    'be4f0224-2758-4a1e-9ad4-85aac4924cd2',
    'fb98f517-3252-4261-87cd-bc14800b3e83',
    '8939b5f2-9ac2-43e3-963a-c5d06ce84d02',
    '683199bf-4627-440e-9efe-4b2696891bb5',
    'abcfd640-2f74-4ada-b974-229ad724644d',
    '4b726266-d2fe-4340-bb01-a14125b45c22',
    'b6acc084-ec0b-4c3d-8b54-b5e3e73ac8e5',
    '2318605d-534c-44c7-97ad-394ecb99d9a0',
    'e6dd040c-2c59-492d-a66a-d50a50e1a198',
    '2db02d39-f2fb-40eb-a1e5-1d6bb9c6118d',
    '3c42ee7e-3fc8-4959-baf9-4b4ce13c3f0b'
  ]

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

  it('returns all resolved events for category', async (): Promise<void> => {
    let walker
    try {
      walker = await es.walkEventsByStreamCategory('projectiontest')
      const result = await walker.toArray()
      assert.ok('ok')
      assert.strictEqual(result.length, 12)
      result.forEach(
        (event): void => {
          assert.strictEqual(event.name === 'LookUpEvent1' || event.name === 'LookUpEvent2', true)
        }
      )
    } catch (err) {
      assert.fail(err)
    }
  })

  it('returns all linked events for category', async (): Promise<void> => {
    let walker
    try {
      walker = await es.walkEventsByStreamCategory('projectiontest', 0, false)
      const result = await walker.toArray()
      assert.ok('ok')
      assert.strictEqual(result.length, 12)
      result.forEach(
        (event): void => {
          assert.strictEqual(validateIdArray.includes(event.metadata.$causedBy), true)
        }
      )
    } catch (err) {
      assert.fail(err)
    }
  })
})
