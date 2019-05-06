import {Eventstore, Event} from '../../../src'
import * as assert from 'assert'

describe('Transaction tests', (): void => {
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

  it('creates a new transaction', async (): Promise<void> => {
    const transaction = await es.atStream('transactionstarttest').startTransaction()
    assert.notStrictEqual(transaction, null)
    assert.notStrictEqual(transaction, undefined)
    assert.notStrictEqual(transaction.id, null)
    assert.notStrictEqual(transaction.id, undefined)
    assert.strictEqual(transaction.name.startsWith('Transaction: '), true)
  })

  it('appends events to transaction', async (): Promise<void> => {
    const singleEvent = new Event('SingleEventWritten')
    const multiEvents = [
      new Event('FirstEventWritten'),
      new Event('NextEventWritten'),
      new Event('LastEventWritten')
    ]
    const transaction = await es.atStream('transactionwritetest').startTransaction()
    await transaction.append(singleEvent)
    await transaction.append(multiEvents)
    await transaction.commit()
    assert.ok('has committed')
    const firstEvent = await es.fromStream('transactionwritetest').getFirstEvent()
    assert.strictEqual(firstEvent.id, singleEvent.id)
    const lastEvent = await es.fromStream('transactionwritetest').getLastEvent()
    assert.strictEqual(lastEvent.id, multiEvents[2].id)
  })

  it('appends events to transaction requiered master', async (): Promise<void> => {
    const singleEvent = new Event('SingleEventWritten')
    const multiEvents = [
      new Event('FirstEventWritten'),
      new Event('NextEventWritten'),
      new Event('LastEventWritten')
    ]
    const transaction = await es
      .atStream('transactionwritetestmaster')
      .requiresMaster()
      .startTransaction()
    await transaction.append(singleEvent)
    await transaction.append(multiEvents)
    await transaction.commit()
    assert.ok('has committed')
    const firstEvent = await es.fromStream('transactionwritetestmaster').getFirstEvent()
    assert.strictEqual(firstEvent.id, singleEvent.id)
    const lastEvent = await es.fromStream('transactionwritetestmaster').getLastEvent()
    assert.strictEqual(lastEvent.id, multiEvents[2].id)
  })

  it('it throws on re-commiting', async (): Promise<void> => {
    const singleEvent = new Event('SingleEventWritten')
    const transaction = await es.atStream('transactionwritetest').startTransaction()
    await transaction.append(singleEvent)
    await transaction.commit()
    assert.ok('has committed')
    try {
      await transaction.commit()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreInvalidTransactionError')
    }
  })

  it('it throws on writing to already committed transactions', async (): Promise<void> => {
    const singleEvent = new Event('SingleEventWritten')
    const transaction = await es.atStream('transactionwritetest').startTransaction()
    await transaction.append(singleEvent)
    await transaction.commit()
    assert.ok('has committed')
    try {
      await transaction.append(singleEvent)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreInvalidTransactionError')
    }
  })

  it('it throws on writing of already stored events', async (): Promise<void> => {
    const singleEvent = await es.fromStream('transactionwritetest').getFirstEvent()
    const transaction = await es.atStream('transactionwritetest').startTransaction()
    try {
      await transaction.append(singleEvent)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })

  it('it throws on commiting roled back transactions', async (): Promise<void> => {
    const singleEvent = new Event('SingleEventWritten')
    const transaction = await es.atStream('transactionwritetest').startTransaction()
    await transaction.append(singleEvent)
    await transaction.roleBack()
    try {
      await transaction.commit()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreInvalidTransactionError')
    }
  })

  it('it throws on writing to roled back transactions', async (): Promise<void> => {
    const singleEvent = new Event('SingleEventWritten')
    const transaction = await es.atStream('transactionwritetest').startTransaction()
    await transaction.append(singleEvent)
    await transaction.roleBack()
    try {
      await transaction.append(singleEvent)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreInvalidTransactionError')
    }
  })

  it('it throws on invalid transaction', async (): Promise<void> => {
    const singleEvent = new Event('testevent')
    const transaction = await es.atStream('transactionwritetest').startTransaction(-1)
    await transaction.append(singleEvent)
    try {
      await transaction.commit()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreWrongExpectedVersionError')
    }
  })

  it('it throws on metastreams', async (): Promise<void> => {
    try {
      await es.atStream('$$transactionwritetest').startTransaction()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreBadRequestError')
    }
  })
})
