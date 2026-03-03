import { parentPort, workerData } from 'node:worker_threads';

import { runTask } from '@codemod-utils/threads';

import { task } from './task.js';

type WorkerData = {
  datasets: Parameters<typeof task>[];
};

const { datasets } = workerData as WorkerData;

runTask(task, datasets)
  .then((results) => {
    parentPort?.postMessage(results);
  })
  .catch((error) => {
    throw error;
  });
