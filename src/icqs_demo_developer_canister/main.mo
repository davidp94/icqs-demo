import ICQS "canister:icqs_demo";

actor {

    public type MailRequest = {
        metadata: ?Text; // can be request ID

        from: ?Text;
        to: Text;
        subject: Text;
        body: Text;
    };

    public shared (msg) func register(nickname: Text, email: Text): async() {
        // TODO: do something with nickname
        // example: email verification token generation...
        let tokenValidation = "DWOWNIO23K4IDWNDIW";

        // Intercanister call to ICQS Canister
        ignore ICQS.enqueue({
            metadata= ?"registration-nickname";

            from= null;
            to= email;
            subject= "Welcome to MyWebsite " # nickname;
            body= "Confirm your registration with the code: " # tokenValidation;
        });
    };

};