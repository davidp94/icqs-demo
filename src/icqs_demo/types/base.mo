module {
    public type QueueConfig = {
        administrators: [Principal];

        workers: [Principal];

        writers: [Principal];
    };
}