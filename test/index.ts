import {Eventstore} from '../src/eventstore'

const main = async (): Promise<void> => {
  const es = new Eventstore()
  console.log('start')
  await es.connect()
  await es.ping()
  await es.disconnect()
}

main()
