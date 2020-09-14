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

// console.log(kObj);

const actor = getActor(
  process.env.DFX_HOST,
  process.env.DFX_CANISTERID,
  makeKeyPair(kObj.publicKey.data, kObj.secretKey.data)
);

// actor
//   .whoami((principal) => {
//     console.log("actor loaded");
//     console.log("principal of actor", principal);
//   })
//   .catch(console.error);

// console.log(Actor.canisterIdOf(actor).toString())


// Actor.createActorClass()

actor
  .getConfig((config) => {
    console.log("actor config", config);
  })
  .catch(console.error);

// actor
//   .greet((config) => {
//     console.log("actor greet", config);
//   })
//   .catch(console.error);

icqsWorkerQueue.process((job, doneCallback) => {
  //   console.log("TODO: process", job);
  console.log("TODO: flush queue");
  console.log("TODO: process each job");
  doneCallback(null);
});

// every five seconds fetch the queue canister
icqsWorkerQueue.add({ foo: "bar" }, { repeat: { every: 5000 } });

icqsWorkerTasksQueue.process((job, doneCallback) => {
  //   console.log("TODO: process", job);
  console.log("TODO: sendEmail");
  const msg = {
    to: "icqsdemo@yopmail.net",
    from: "davidphan33@gmail.com",
    subject: "Sending with icqs is fun",
    text: "and easy to do anywhere, even with Motoko",
  };
  sgMail.send(msg);
  doneCallback(null);
});
