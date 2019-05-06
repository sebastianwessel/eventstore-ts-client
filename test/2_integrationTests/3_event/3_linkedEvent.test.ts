import {Eventstore, Event, Stream} from '../../../src'
import * as assert from 'assert'
import * as sinon from 'sinon'

describe('Linked event', (): void => {
  const es = new Eventstore({
    uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
    clientId: 'ts-client-test',
    useSSL: true
  })
  let sandbox = sinon.createSandbox()
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

  afterEach(
    (): void => {
      sandbox.restore()
    }
  )

  it('resolves linked event', async (): Promise<void> => {
    const walker = await es.fromStream('$ce-teneventsstream').walkStreamForward(0, false)
    await walker.forEach(
      async (eventEntry): Promise<void> => {
        assert.strictEqual(eventEntry.isLink(), true)
        assert.strictEqual(typeof eventEntry.metadata, 'object')
        const event = await es.resolveLink(eventEntry, true, {
          username: 'restrictedUser',
          password: 'restrictedOnlyUserPassword'
        })
        if (event) {
          assert.strictEqual(event.isLink(), false)
        }
      }
    )
    assert.ok('ok')
  })

  it('returns same event if not link', async (): Promise<void> => {
    const event = new Event('testEvent')
    const resolvedEvent = await es.resolveLink(event)
    assert.strictEqual(event, resolvedEvent)
  })

  it('throws NotFoundError', async (): Promise<void> => {
    class TestClass extends Event {
      public constructor() {
        super('testEvent')
      }

      public get data(): string {
        return '0@fakeStream'
      }

      public isLink(): boolean {
        return true
      }
    }

    sandbox.stub(Stream.prototype, 'getEventByNumber').resolves(null)
    const event = new TestClass()

    try {
      await es.resolveLink(event)
      assert.fail('has not thrown')
    } catch (err) {
      console.log(err)
      assert.strictEqual(err.name, 'EventstoreNotFoundError')
    }
  })

  it('throws ProtocolError', async (): Promise<void> => {
    sandbox.stub(Stream.prototype, 'getEventByNumber').resolves({data: false})
    sandbox.stub(Event.prototype, 'isLink').returns(true)
    const event = new Event('testEvent')
    try {
      await es.resolveLink(event)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreProtocolError')
    }
  })
})
