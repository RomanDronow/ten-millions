const { readFile } = require('fs/promises');
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');
const { MongoClient } = require('mongodb');

const numWorkers = 4;

async function readDataFile(fileName) {
  const fileData = await readFile(fileName, 'utf8');
  return JSON.parse(fileData);
}

function createChunks(records, chunkSize) {
  const res = [];
  for (let i = 0; i < records.length; i += chunkSize) {
    res.push(records.slice(i, i + chunkSize));
  }
  return res;
}

async function runWorkers(chunks) {
  const workers = [];

  for (let i = 0; i < numWorkers; i++) {
    const worker = new Worker(__filename, {
      workerData: { chunk: chunks[i] },
    });

    workers.push(worker);

    worker.on('error', (err) => {
      console.error(`Worker error: ${err}`);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });

    worker.on('message', (message) => {
      console.log(message);
    });
  }

  await Promise.all(
    workers.map(
      (worker) =>
        new Promise((resolve) => {
          worker.on('exit', () => resolve());
        }),
    ),
  ).then(() => {
    console.log('All workers finished');
    process.exit(0);
  });
}

async function insertDataIntoMongo() {
  const url = 'mongodb://root:root@localhost:27017';

  const { chunk } = workerData;
  const client = await new MongoClient(url).connect();
  const collection = client.db('sample').collection('strings');

  try {
    await collection.insertMany(chunk, {
      ordered: false,
      writeConcern: { w: 0 },
    });

    parentPort.postMessage(`Inserted ${chunk.length} records`);

    await client.close();

    process.exit(0);
  } catch (e) {
    parentPort.postMessage(`Error: ${e}`);
  }
}

(async function main() {
  if (isMainThread) {
    const records = await readDataFile('data.json');

    const chunkSize = Math.ceil(records.length / numWorkers);

    const chunks = createChunks(records, chunkSize);
    await runWorkers(chunks);
  } else {
    await insertDataIntoMongo();
  }
})();
