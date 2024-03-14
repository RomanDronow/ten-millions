const { createWriteStream } = require('fs');

const LIMIT = 10_000;
const fileName = 'data.json';

function generateRandomStringObject() {
  return { name: Math.random().toString(36).substring(2) };
}

(function generateData() {
  console.log('Generating data...');

  const writeStream = createWriteStream(fileName);

  writeStream.write('[');

  for (let i = 1; i <= LIMIT; i++) {
    writeStream.write(JSON.stringify(generateRandomStringObject()));

    if (i % 10000 === 0) {
      console.log(`${i} records generated`);
    }

    if (i < LIMIT) {
      writeStream.write(',');
    }
  }

  writeStream.write(']');
  writeStream.end();

  console.log('Data generated');
})();