import {expect} from 'chai'
import {Eventstore} from '../../../src'
describe('Stream basic tests', (): void => {
  const es = new Eventstore({
    uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
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

  it('returns a stream instance for function stream', (): void => {
    const stream = es.stream('hola')
    expect(stream).not.to.be.undefined
    expect(stream).not.to.be.null
  })

  it('returns a stream instance for function fromStream', (): void => {
    const stream = es.fromStream('hola')
    expect(stream).not.to.be.undefined
    expect(stream).not.to.be.null
  })

  it('returns a stream instance for function atStream', (): void => {
    const stream = es.fromStream('hola')
    expect(stream).not.to.be.undefined
    expect(stream).not.to.be.null
  })

  it('returns same stream on requiresMaster', (): void => {
    const stream = es.stream('hola')
    const result = stream.requiresMaster()
    expect(stream).to.be.equal(result)
  })

  it('returns same stream on withCredentials', (): void => {
    const stream = es.stream('hola')
    const result = stream.withCredentials({username: 'otheruser', password: 'otherpassword'})
    expect(stream).to.be.equal(result)
  })

  it('returns same stream on resolveAllLinks', (): void => {
    const stream = es.stream('hola')
    const result = stream.resolveAllLinks()
    expect(stream).to.be.equal(result)
  })

  it('can soft delete a stream', async (): Promise<void> => {
    await es.stream('streamtosoftdelete').softDelete()
  })

  it('can hard delete a stream', async (): Promise<void> => {
    await es.stream('streamtoharddelete').hardDelete()
  })
})
