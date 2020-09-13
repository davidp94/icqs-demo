const Queue = require("bull");

const icqsWorkerQueue = new Queue("icqsWorker", process.env.REDIS_URL);
const icqsWorkerTasksQueue = new Queue(
  "icqsWorkerTasks",
  process.env.REDIS_URL
);

icqsWorkerQueue.process((job, doneCallback) => {
  console.log("TODO: process", job);
  console.log("TODO: flush queue");
  console.log("TODO: process each job");
  doneCallback(null);
});


// every five seconds fetch the queue canister
icqsWorkerQueue.add({ foo: "bar" }, { repeat: { every: 5000 } });

icqsWorkerTasksQueue.process((job, doneCallback) => {
  console.log("TODO: process", job);
  console.log("TODO: sendEmail");
  doneCallback(null);
});
