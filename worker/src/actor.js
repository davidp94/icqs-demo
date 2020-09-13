import fetch from "node-fetch";
import { Crypto } from "node-webcrypto-ossl";
// import { KeyPair } from "@dfinity/agent/src/auth";

import {
  HttpAgent,
  Principal,
  makeActorFactory,
  makeAuthTransform,
  makeNonceTransform,
} from "@dfinity/agent";

global.crypto = new Crypto();
global.fetch = fetch;

const DIDL = ({ IDL }) => {
  const MailRequest = IDL.Record({
    to: IDL.Text,
    subject: IDL.Text,
    metadata: IDL.Opt(IDL.Text),
    body: IDL.Text,
    from: IDL.Opt(IDL.Text),
  });
  const QueueConfig = IDL.Record({
    administrators: IDL.Vec(IDL.Principal),
    workers: IDL.Vec(IDL.Principal),
    writers: IDL.Vec(IDL.Principal),
  });
  return IDL.Service({
    flush: IDL.Func([], [IDL.Vec(MailRequest)], []),
    setConfig: IDL.Func([QueueConfig], [], []),
    getConfig: IDL.Func([], [QueueConfig], []),
    enqueue: IDL.Func([MailRequest], [], []),
  });
};

export const getActor = (host, canisterId, keypair) => {
  const httpAgent = new HttpAgent({
    host: host,
    principal: Principal.selfAuthenticating(keypair.publicKey),
  });
  httpAgent.addTransform(makeNonceTransform());
  httpAgent.setAuthTransform(makeAuthTransform(keypair));

  let actor = makeActorFactory(DIDL)({ canisterId: canisterId, httpAgent });

  return actor;
};
