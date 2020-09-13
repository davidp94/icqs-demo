module {
    
    public type MailRequest = {
        metadata: ?Text; // can be request ID

        from: ?Text;
        to: Text;
        subject: Text;
        body: Text;
    };

    public type MailResponse = {
        metadata: ?Text;
        response: {
            #ok;
            #err: {
                #badRequest;
                // ...
                #other: {
                    message: Text;
                };
            };
        };
    };

}