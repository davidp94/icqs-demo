import Array "mo:base/Array";
import List "mo:base/List";
import Option "mo:base/Option";

import T "./types/mailing";
import TBase "./types/base";

import QQ "../../external_libs/Queue/src/Queue";

actor class MailingQueue() {
    // TODO: once `dfx` handles it, add initial queueConfig as a parameter to the actor

    var queueConfig: TBase.QueueConfig = {
        administrators = [];

        writers = [];
        workers = [];
    };

    var q: QQ.Queue<T.MailRequest> = QQ.nil();

    // callable only if no administrators or by an admin
    public shared (msg) func setConfig(_queueConfig: TBase.QueueConfig): async () {
        assert(queueConfig.administrators.size() == 0 or isAdministrator(msg.caller));
        queueConfig := _queueConfig;
    };
    

    public func getConfig(): async (TBase.QueueConfig) {
        return queueConfig;
    };
    
    public shared (msg) func enqueue(mR: T.MailRequest): async () {
        assert(isWriter(msg.caller));
        q := QQ.enqueue(mR, q);
    };

    public shared (msg) func flush(): async [T.MailRequest] {
        assert(isWorker(msg.caller));

        var l: List.List<T.MailRequest> = List.nil<T.MailRequest>();

        while(not QQ.isEmpty(q)) {
            let (i, q0) = QQ.dequeue(q);
            l := List.push<T.MailRequest>(Option.unwrap(i), l);
            q := q;
        };
        List.toArray<T.MailRequest>(l)
    };

    private func isAdministrator(c: Principal): Bool {
        let found = Array.find<Principal>(queueConfig.administrators, func(p: Principal) {p == c});
        return Option.isSome(found);
    };

    private func isWorker(c: Principal): Bool {
        let found = Array.find<Principal>(queueConfig.workers, func(p: Principal) {p == c});
        return Option.isSome(found);
    };

    private func isWriter(c: Principal): Bool {
        let found = Array.find<Principal>(queueConfig.writers, func(p: Principal) {p == c});
        return Option.isSome(found);
    };
};
