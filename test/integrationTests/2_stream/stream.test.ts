import {expect} from 'chai'
import {Eventstore} from '../../../src'
import * as assert from 'assert'

describe('Stream basic tests', (): void => {
  const es = new Eventstore()
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

  it('returns a stream instance', async (): Promise<void> => {
    try {
      const stream = await es.stream('hola')
      expect(stream).not.to.be.undefined
      expect(stream).not.to.be.null
    } catch (err) {
      assert.fail(err)
    }
  })
})
