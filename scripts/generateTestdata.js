/* eslint-disable @typescript-eslint/no-var-requires */
const uuid = require('uuid4')
const fs = require('fs')
const path = require('path')

const outputDir = path.resolve(__dirname, '../test/2_integrationTests/testSetup/testStreams')

const eventNameList = [
  'EventA',
  'EventB',
  'EventC',
  'EventD',
  'EventE',
  'EventF',
  'EventG',
  'EventH',
  'EventI',
  'EventJ'
]

let count = 0

const generateHundredFile = (fileName) => {
  const testData = []
  for (let x = 0, xMax = 100; x < xMax; x++) {
    eventNameList.forEach((name) => {
      testData.push({
        eventId: uuid(),
        eventType: name,
        data: {
          count
        }
      })
      count++
    })
  }

  fs.writeFileSync(path.resolve(outputDir, fileName), JSON.stringify(testData))
}

const generateTenThousand = () => {
  const streamName = 'tenthousandstream-' + uuid()
  fs.mkdirSync(path.resolve(outputDir, streamName))
  for (let x = 0, xMax = 10; x < xMax; x++) {
    generateHundredFile(streamName + '/' + x + '.json')
  }
}

generateTenThousand()
