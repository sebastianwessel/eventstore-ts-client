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

  it('returns a stream instance', (): void => {
    const stream = es.stream('hola')
    expect(stream).not.to.be.undefined
    expect(stream).not.to.be.null
  })

  it('can soft delete a stream', async (): Promise<void> => {
    assert.doesNotThrow(
      async (): Promise<void> => {
        await es.stream('streamtosoftdelete').softDelete()
      }
    )
  })

  it('can hard delete a stream', async (): Promise<void> => {
    assert.doesNotThrow(
      async (): Promise<void> => {
        await es.stream('streamtoharddelete').hardDelete()
      }
    )
  })
})
