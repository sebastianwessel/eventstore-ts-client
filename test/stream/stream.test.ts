import {expect} from 'chai'
import {Eventstore} from '../../src'
import * as assert from 'assert'

describe('Stream basic tests', () => {
  const es = new Eventstore()
  before(async () => {
    await es.connect()
  })

  after(async () => {
    await es.disconnect()
  })

  it('returns a stream instance', async () => {
    try {
      const stream = await es.stream('hola')
      expect(stream).not.to.be.undefined
      expect(stream).not.to.be.null
    } catch (err) {
      assert.fail(err)
    }
  })
})
