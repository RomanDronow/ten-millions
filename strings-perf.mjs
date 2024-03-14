import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

async function makeRequest(name) {
  const url = `http://localhost:3000/random-strings/find-by-name/${name}`;

  await fetch(url, { method: 'GET' });
}

async function benchmark(name, fn) {
  const start = performance.now();
  await fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds.`);
}

async function createIndex() {
  await fetch('http://localhost:3000/random-strings/create-index', {
    method: 'PATCH',
  });
}

async function removeIndex() {
  await fetch('http://localhost:3000/random-strings/remove-index', {
    method: 'PATCH',
  });
}

async function warmUp() {
  await Promise.all(
    Array.from({ length: 1 }, (_, i) => makeRequest(`name${i}`)),
  );
}

(async function main() {
  // 10 requests, indexed
  await createIndex();
  await benchmark('10 requests, indexed', async () => {
    await Promise.all(
      Array.from({ length: 10 }, (_, i) => makeRequest(`name${i}`)),
    );
  });

  await removeIndex();
  // 10 requests, not indexed
  await benchmark('10 requests, non-indexed', async () => {
    await Promise.all(
      Array.from({ length: 10 }, (_, i) => makeRequest(`name${i}`)),
    );
  });
})();
