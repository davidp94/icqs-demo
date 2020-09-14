require("dotenv").config();

const Queue = require("bull");
const sgMail = require("@sendgrid/mail");
const { getActor } = require("./src/actor");
const { makeKeyPair, Actor } = require("@dfinity/agent");
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const icqsWorkerQueue = new Queue("icqsWorker", process.env.REDIS_URL);
const icqsWorkerTasksQueue = new Queue(
  "icqsWorkerTasks",
  process.env.REDIS_URL
);

const kObj = JSON.parse(Buffer.from(process.env.DFX_KEY, "base64").toString());

const actor = getActor(
  process.env.DFX_HOST,
  process.env.DFX_CANISTERID,
  makeKeyPair(kObj.publicKey.data, kObj.secretKey.data)
);

// actor
//   .whoami()
//   .then((principal) => {
//     console.log("actor loaded");
//     console.log("principal of actor", principal.toString());
//   })
//   .catch(console.error);

icqsWorkerQueue.process(async (job, doneCallback) => {
  //   console.log("TODO: process", job);

  const tasks = await actor.flush();

  tasks.forEach((t) => {
    // console.log("TODO: process each job", t);
    icqsWorkerTasksQueue.add(t);
  });
  doneCallback(null, { tasks });
});

// every five seconds fetch the queue canister
icqsWorkerQueue.add({ foo: "bar" }, { repeat: { every: 5000 } });

icqsWorkerTasksQueue.process((job, doneCallback) => {
//   console.log("TODO: process", job);
  const { to, subject, body } = job.data;
  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM,
    subject: "[ICQS] " + subject,
    text: body,
  };
  sgMail.send(msg);
  doneCallback(null);
});
